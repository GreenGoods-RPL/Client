'use client'
import React, { useEffect, useState } from "react";
import { getTransactions } from "@/services/user";
import Header from "@/components/Header";
import Footer from "@/components/Footer"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");  

  useEffect(() => {
    if(token) {      
      const fetchTransactions = async () => {
        try {
          const response = await getTransactions(token);
          setTransactions(response);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchTransactions();
    }
  }, [token]);

  return (
    <>
      <Header />
      <h1>Your Transactions</h1>
      <div className="transaction-list">
          {transactions.map((trans, index) => (
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
      <Footer />
    </>
  );
}
