"use client";

import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch pending products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8008/api/admin/products",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  // Accept product handler
  const acceptProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8008/api/admin/accept/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to accept product");
      }
      setProducts(products.filter((product) => product.id !== productId)); // Remove accepted product
    } catch (error) {
      console.error("Error accepting product:", error);
    }
  };

  // Reject product handler
  const rejectProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8008/api/admin/reject/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reject product");
      }
      setProducts(products.filter((product) => product.id !== productId)); // Remove rejected product
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Pending Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">No pending products to review.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border bg-white border-gray-300 rounded-lg shadow-sm p-4"
            >
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-sm text-gray-600">
                <strong>Price:</strong> Rp{product.price}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong> {product.description}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Green Score:</strong> {product.green_score}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Avg Rating:</strong> {product.avg_rating || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Certificates:</strong> {product.certificates || "N/A"}
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
                  onClick={() => acceptProduct(product.id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
                  onClick={() => rejectProduct(product.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
