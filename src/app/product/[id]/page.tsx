"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import duck from "@public/images/duck.jpeg";
import { getProductById } from "@/services/product";
import { getReviews, createReview } from "@/services/review";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const productId = use(params).id;
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [review, setReview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [visibleReviews, setVisibleReviews] = useState<number>(4);

  // Refs for form inputs
  const ratingRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(productId);
          setProduct(product);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchReviews = async () => {
        try {
          const reviewData = await getReviews(productId);
          setReview(reviewData);
        } catch (error) {
          console.error("Error fetching product reviews:", error);
        }
      };

      fetchProduct();
      fetchReviews();
    }
  }, [productId]);

  const handleAddReview = async () => {
    try {
      const rating = ratingRef.current?.value;
      const comment = commentRef.current?.value;

      if (!rating || !comment) {
        alert("Please fill out all fields.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token available");
      }

      const result = await createReview(
        { productId, rating: Number(rating), comment },
        token
      );

      setReview({ ...review, reviews: [result, ...review.reviews] });
      console.log("Review submitted:", result);

      // Clear input fields
      if (ratingRef.current) ratingRef.current.value = "";
      if (commentRef.current) commentRef.current.value = "";
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleLoadMoreReviews = () => {
    setVisibleReviews(visibleReviews + 4);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Product not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="font-montserrat px-10 lg:px-32">
        <div className="rounded-lg py-8">
          {/* Product Info Section */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Product Image */}
            <div className="md:w-1/2">
              <Image
                src={duck}
                alt="Product Image"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            {/* Product Details */}
            <div className="w-full md:w-1/2 py-5">
              <h1 className="text-6xl font-bold text-gray-800 mb-4 font-yanone">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-4xl">
                  {"★".repeat(Math.round(product.avg_rating))}
                  {"☆".repeat(5 - Math.round(product.avg_rating))}
                </span>
                <span className="ml-3 text-gray-600 text-lg">
                  ({product.avg_rating} / 5)
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800 my-5">
                Rp{product.price}
              </p>
              <hr className="border-neutral my-4" />
              <div>
                <p className="text-lg font-semibold mb-2 text-primary">
                  Description:
                </p>
                <p className="text-gray-700 text-lg">{product.description}</p>
              </div>
              <hr className="border-neutral my-4" />
              <div className="flex-col items-center py-2 max-w-36">
                <p className="text-lg font-semibold mb-2 text-primary">
                  Eco-score:
                </p>
                <p className="font-bold text-2xl">{product.green_score}</p>
              </div>
              <hr className="border-neutral my-4" />
              <div className="flex items-center gap-4 mt-6">
                <button
                  className="bg-secondary hover:bg-primary w-full text-white py-3 px-6 rounded-full shadow hover:bg-primary-dark"
                  onClick={() => router.push(`/checkout/${product.id}`)}
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Reviews
          </h2>
          <hr className="border-neutral mb-6" />
          {review && review.reviews.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {review.reviews
                  .slice(0, visibleReviews)
                  .map((review: any, index: number) => (
                    <li
                      key={index}
                      className="px-8 py-4 bg-neutral rounded-lg shadow-sm hover:scale-105 transition-all"
                    >
                      <div className="flex items-center text-yellow-400 text-2xl">
                        {"★".repeat(Math.round(review.rating))}
                        {"☆".repeat(5 - Math.round(review.rating))}
                      </div>
                      <p className="text-sm mt-2 mb-5 font-bold">
                        {review.user.username}
                      </p>
                      <p className="text-gray-800 text-base mb-2">
                        &quot;{review.comment}&quot;
                      </p>
                    </li>
                  ))}
              </ul>
              {review.reviews.length > visibleReviews && (
                <div className="flex justify-center">
                  <button
                    onClick={handleLoadMoreReviews}
                    className="mt-6 min-w-44 text-white hover:text-primary-dark bg-secondary py-2 px-6 rounded-full shadow hover:bg-primary"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600">No reviews available.</p>
          )}
        </div>
        {/* Add Review Section */}
        <div className="flex justify-center">
          <div className="mt-12 lg:min-w-[500px]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add a Review
            </h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddReview();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  ref={ratingRef}
                  type="number"
                  min="1"
                  max="5"
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  ref={commentRef}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="bg-secondary hover:bg-primary text-white py-2 px-6 rounded-full shadow hover:bg-primary-dark"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
