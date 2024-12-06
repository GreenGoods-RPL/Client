"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null); // To store user role
  const router = useRouter();

  useEffect(() => {
    const fetchRoleAndProfile = async () => {
      try {
        // Fetch role from token or user API
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        const userRole = decodedToken.role; // Assuming role is included in the token
        console.log("Decoded token:", decodedToken);
        console.log("User role:", userRole);
        
        setRole(userRole);

        // Determine API endpoint based on role
        const apiEndpoint =
          userRole === "seller"
            ? "http://localhost:8008/api/seller"
            : "http://localhost:8008/api/user";
        console.log("API endpoint:", apiEndpoint);

        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error("Failed to fetch profile details");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleAndProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
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
      <section className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-primary mt-10">Profile</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Hello, {profile.username}!
          </h2>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="text-gray-600 mb-6">
            <strong>Points:</strong> {profile.points}
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
