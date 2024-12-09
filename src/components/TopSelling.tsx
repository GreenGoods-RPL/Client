"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import duck from "@public/images/duck.jpg";
import Button from "@/components/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        <h1 className="font-yanone font-bold lg:text-5xl text-3xl text-primary mb-6">
          TOP SELLING
        </h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
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
          <p>No products available.</p>
        )}
        <Button link="/search" text="More" />
      </div>
    </section>
  );
};

export default TopSellingProducts;
