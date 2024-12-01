"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import duck from "@public/images/duck.jpeg";
import Button from "@/components/Button";

const TopSellingProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8008/api/product/");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        const productsWithImages = data.map((product: any) => ({
          ...product,
          image: duck,
        }));
        setProducts(productsWithImages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-8">
      <div className="container flex flex-col items-center justify-center">
        <h1 className="font-yanone font-bold text-5xl text-primary mb-6">
          TOP SELLING
        </h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                id={product.id}
                key={product.id}
                image={product.image}
                title={product.name} // Assuming the API returns "name" for product titles
                rating={product.avg_rating || 0} // Adjust based on API response
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <p>No products available.</p>
        )}
        <Button link="/search" text="More" />
      </div>
    </section>
  );
};

export default TopSellingProducts;
