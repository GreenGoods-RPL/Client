"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            "http://localhost:8008/api/seller/products",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setProducts(data);
          } else {
            console.error("Failed to fetch products");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, []);

  // Navigate to create product form
  const handleCreateProduct = () => {
    router.push("/seller/form");
  };

  // Navigate to update/delete product form
  const handleEditProduct = (productId) => {
    router.push(`/seller/form/${productId}`);
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8008/api/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Product deleted successfully");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <button
        onClick={handleCreateProduct}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Create New Product
      </button>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="product-item border border-gray-300 p-4 mb-4 rounded flex justify-between items-center"
            >
              <div onClick={() => handleEditProduct(product.id)} className="cursor-pointer">
                <h3 className="font-medium">{product.name}</h3>
                <p>Price: Rp{product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>Green Score: {product.green_score}</p>
                <p>Status: {product.status}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
