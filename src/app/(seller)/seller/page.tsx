"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import duck from "@public/images/duck.jpeg";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRoleAndProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8008/api/seller", {
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
      <section className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-primary mt-10">Seller Profile</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex">
          {/* Profile Picture and Information Section */}
          <div className="flex-1 flex flex-col items-start mr-6">
          <Image
              src={duck || "/default-profile.png"} // Replace with your default image path
              alt="Profile"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Hello, {profile.username}!
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {profile.email}
            </p>
            <p className="text-gray-600">
              <strong>Points:</strong> {profile.points}
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col w-full max-w-xs">
            <button
              onClick={() => router.push("/seller/orders")}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors mb-2"
            >
              View Orders
            </button>
            <button
              onClick={() => router.push("/seller/products")}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              Manage Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
