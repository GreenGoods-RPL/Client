"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { searchProducts } from "@/services/product";

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
          const products = await searchProducts(keyword);
          setProducts(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [keyword]);

  const fetchFilteredProducts = async (filters: {
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    minEcoScore?: string;
  }) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:8008/api/product/filter?${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch filtered products.");
      }

      const data = await response.json();
      const productsWithImages = data.map((product: any) => ({
        ...product
      }));
      setProducts(productsWithImages);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="flex flex-col lg:flex-row px-10 lg:px-16 py-6 gap-6">
        {/* Filter Sidebar */}
        <FilterSidebar onApplyFilters={fetchFilteredProducts} />

        {/* Product Display Section */}
        <section className="flex-1">
          <h2 className="text-2xl font-bold text-primary mb-6">
            {keyword ? `Search Results for "${keyword}"` : "Look for Products"}
          </h2>
          {isLoading ? (
            <p>Enter your search keyword...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  id={product.id}
                  key={product.id}
                  image={null}
                  title={product.name}
                  rating={product.avg_rating || 0}
                  price={product.price}
                />
              ))}
            </div>
          ) : (
            <p>
              {keyword
                ? `No products found for "${keyword}".`
                : "No products found with the selected filters..."}
            </p>
          )}
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
