"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
          <button
            onClick={() => router.push("/orders")}
            className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            View Orders
          </button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
