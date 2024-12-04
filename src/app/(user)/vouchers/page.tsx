'use client';
import React, { useEffect, useState } from "react";
import { getVouchers } from "@/services/user";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (token) {
      const fetchVouchers = async () => {
        try {
          const response = await getVouchers(token);
          setVouchers(response);
        } catch (error) {
          console.error("Failed to fetch vouchers:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchVouchers();
    }
  }, [token]);

  return (
    <>
      <Header />
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Vouchers</h1>
          {isLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : vouchers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                >
                  <h2 className="text-lg font-semibold text-gray-700">
                    Code: <span className="text-blue-500">{voucher.code}</span>
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Created At:{" "}
                    <span className="text-gray-800">
                      {new Date(voucher.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Redeemed:{" "}
                    <span
                      className={`font-semibold ${
                        voucher.isRedeemed ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {voucher.isRedeemed ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No vouchers found.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
