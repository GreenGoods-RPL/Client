"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch products based on the keyword
  useEffect(() => {
    if (keyword) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:8008/api/product/search?keyword=${encodeURIComponent(
              keyword
            )}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch search results.");
          }

          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [keyword]);

  // Function to fetch filtered products
  const fetchFilteredProducts = async (filters: {
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    minEcoScore?: string;
  }) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:8008/api/product/filter?${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch filtered products.");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row px-10 lg:px-16 py-6 gap-6">
        {/* Filter Sidebar */}
        <FilterSidebar onApplyFilters={fetchFilteredProducts} />

        {/* Product Display Section */}
        <section className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {keyword ? `Search Results for "${keyword}"` : "Filtered Products"}
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.name}
                  rating={product.rating}
                  price={product.price}
                />
              ))}
            </div>
          ) : (
            <p>
              {keyword
                ? `No products found for "${keyword}".`
                : "No products found with the selected filters."}
            </p>
          )}
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
