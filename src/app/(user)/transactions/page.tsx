"use client";
import React, { useEffect, useState } from "react";
import { getTransactions, completeTransaction } from "@/services/user";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchTransactions = async () => {
        try {
          const response = await getTransactions(token);
          setTransactions(response);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTransactions();
    }
  }, [token]);

  const handleCompleteTransaction = async (transactionId) => {
    try {
      await completeTransaction(token, transactionId);
      setTransactions((prev) =>
        prev.map((trans) =>
          trans.id === transactionId ? { ...trans, status: "Completed" } : trans
        )
      );
    } catch (error) {
      console.error("Failed to complete transaction:", error);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Transactions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions &&
            transactions.map((trans, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {trans.product?.name || "N/A"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {" "}
                    {new Date(trans.purchaseDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Amount: {trans.amount}</p>
                  <p className="text-gray-600">
                    Price: Rp{trans.product?.price || "0.00"}
                  </p>
                  <p
                    className={`text-sm font-medium mt-2 ${
                      trans.status === "FINISHED"
                        ? "text-green-600"
                        : trans.status === "DELIVERED"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {trans.status}
                  </p>
                </div>
                <button
                  onClick={() => handleCompleteTransaction(trans.id)}
                  className={`px-4 py-2 rounded-md transition ${
                    trans.status === "DELIVERED"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={!(trans.status === "DELIVERED")}
                >
                  Complete Transaction
                </button>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
