"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface User {
  username: string;
  email: string;
  points: number;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8008/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("An error occurred while fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <p>
        Unable to load user details. Please try again later or ensure you are
        logged in.
      </p>
    );
  }

  return (
    <>
      <Header />
      <section className="min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-primary mt-10">Profile</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Hello, {user.username}!
          </h2>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-600 mb-6">
            <strong>Points:</strong> {user.points}
          </p>

          {/* Sections */}
          <div className="space-y-4">
            <button
              onClick={() => router.push("/vouchers")}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              View Vouchers
            </button>
            <button
              onClick={() => router.push("/transactions")}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              View Transactions
            </button>
            <button
              onClick={() => router.push("/address")}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              Add/Delete Address
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProfilePage;
