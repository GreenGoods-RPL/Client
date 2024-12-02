'use client'
import React, { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transaction, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // setRole(userRole);
        // const apiEndpoint = userRole === "seller" ?
        //      "http://localhost:8008/api/seller" :
        //      "http://localhost:8008/api/user";
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8008/api/user", {
          method: "GET",
          headers: {
              "Content-Type:": "api/transactions",
              Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch transactions.");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
          console.error("Error fetching transactions:", error);
      } finally {
          setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
    );
  }

  if (!transaction.length) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Transactions not found.</p>
        </div>
    );
  }

  return (
    <>
      <h1>Your Transactions</h1>
  
      <div className="transaction-list">
          {transaction.map((trans, index) => (
          <div key={index} className="transaction-item">
              <div className="product-info">
          <h3>Product ID: {trans.product_id}</h3>
          <p>Purchase Date: {trans.purchase_date}</p>
          <p>Amount: {trans.amount}</p>
          <p className="status">Status: {trans.status}</p>
              </div>
          </div>
          ))}
      </div>
    </>
  );
}
