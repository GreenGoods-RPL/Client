"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProductForm({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = use(params).id; // Get product ID from the URL
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    green_score: "",
    certificates: "",
    stock: "",
  });

  const token = localStorage.getItem("token");

  // Fetch the product data on page load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8008/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const product = await response.json();
          setForm({
            name: product.name,
            price: product.price,
            description: product.description,
            green_score: product.green_score,
            certificates: product.certificates || "",
            stock: product.stock,
          });
        } else {
          alert("Failed to fetch product details.");
          router.push("/seller/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("An error occurred while fetching the product.");
      }
    };

    fetchProduct();
  }, [id, router, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8008/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Product updated successfully");
        router.push("/seller/products");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Green Score (0-5):</label>
            <input
              type="number"
              name="green_score"
              value={form.green_score}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Certificates:</label>
            <input
              type="text"
              name="certificates"
              value={form.certificates}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Stock:</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
