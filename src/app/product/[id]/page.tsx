"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import duck from "@public/images/duck.jpeg";

export default function ProductDetails({ params }: { params: any }) {
  const id = params.id;
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:8008/api/product/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product details.");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

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
      <div className="font-montserrat px-10 lg:px-16 py-8 bg-[#E8F6F3]">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
          {/* Product Info Section */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <Image
                src={duck}
                alt="Product Image"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            {/* Product Details */}
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-2xl">
                  {"★".repeat(Math.round(product.avg_rating))}
                  {"☆".repeat(5 - Math.round(product.avg_rating))}
                </span>
                <span className="ml-3 text-gray-600">
                  ({product.avg_rating} / 5)
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-2">
                ${product.price}{" "}
                <span className="line-through text-gray-400 text-xl">
                  ${product.original_price || ""}
                </span>{" "}
                <span className="text-green-600 text-xl">
                  {product.discount ? `${product.discount}% Off` : ""}
                </span>
              </p>
              <p className="text-gray-700 text-lg mb-4">{product.description}</p>
              <p className="text-green-700 text-lg font-semibold mb-6">
                Eco-score: {product.green_score}
              </p>
              <div className="flex items-center gap-4">
                <label className="text-gray-700 text-lg">Choose Size:</label>
                <div className="flex gap-2">
                  {["Small", "Medium", "Large", "XLarge"].map((size) => (
                    <button
                      key={size}
                      className="py-2 px-4 border rounded-md text-gray-800 hover:bg-gray-100 focus:bg-gray-200"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <button className="bg-primary text-white py-2 px-6 rounded-lg shadow hover:bg-primary-dark">
                  Purchase
                </button>
                <button className="bg-gray-100 text-gray-800 py-2 px-6 rounded-lg shadow hover:bg-gray-200">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>

        </div>
          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Reviews</h2>
            {product.reviews && product.reviews.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.reviews.map((review: any, index: number) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-50 border rounded-lg shadow-sm"
                  >
                    <p className="text-gray-800 text-lg mb-2">
                      {review.comment}
                    </p>
                    <div className="flex items-center text-yellow-400 text-lg">
                      {"★".repeat(Math.round(review.rating))}
                      {"☆".repeat(5 - Math.round(review.rating))}
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Posted on {new Date(review.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No reviews available.</p>
            )}
          </div>
      </div>
      <Footer />
    </>
  );
}
