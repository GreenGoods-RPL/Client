"use client";

import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8008/api/seller/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const updateTransactionStatus = async (transactionId, status) => {
    try {
      const response = await fetch(
        "http://localhost:8008/api/seller/updateTransaction",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transactionId, status }),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update status to ${status}`);
      }
      const updatedTransaction = await response.json();
      setOrders(
        orders.map((order) =>
          order.id === transactionId
            ? { ...order, status: updatedTransaction.status }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders to manage.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg shadow-sm p-4"
            >
              <h2 className="text-lg font-semibold mb-2">Transaction ID: {order.id}</h2>
              <p className="text-sm text-gray-600">
                <strong>Customer:</strong> {order.user.username}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Product:</strong> {order.product.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Price per Unit:</strong> ${order.product.price}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Quantity:</strong> {order.amount}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Purchase Date:</strong> {new Date(order.purchaseDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {order.status}
              </p>
              <div className="flex gap-4 mt-4">
                {order.status === "PENDING" && (
                  <>
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
                      onClick={() => updateTransactionStatus(order.id, "CONFIRMED")}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
                      onClick={() => updateTransactionStatus(order.id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {order.status === "CONFIRMED" && (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
                    onClick={() => updateTransactionStatus(order.id, "DELIVERED")}
                  >
                    Deliver
                  </button>
                )}
                {order.status === "REJECTED" && (
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-md shadow cursor-not-allowed"
                    disabled
                  >
                    Rejected
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
