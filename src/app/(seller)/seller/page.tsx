"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import duck from "@public/images/duck.jpeg";
import jwt_decode from "jsonwebtoken";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const token = localStorage.getItem("token"); // Replace "jwt" with your actual key
  const decodedToken = token ? jwt_decode.decode(token) : null;
  const role = decodedToken?.role || "Unknown";

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
    <section className="w-full flex justify-center items-start gap-10">
      <div className="p-10 rounded-xl bg-white w-[400px] font-montserrat shadow-lg">
        <div className="w-full mb-10 justify-center flex items-center">
          <Image
            src={duck || "/default-profile.png"} // Replace with your default image path
            alt="Profile"
            width={200}
            height={200}
            className="w-34 h-34 rounded-full object-cover shadow-md"
          />
        </div>
        <h3 className="font-montserrat font-bold text-primary">Profile</h3>
        {profile && (
          <div className="flex flex-col">
            <p className="font-semibold text-xl mb-5">{profile.username}</p>
            <table className="table-auto w-full text-gray-800">
              <tbody>
                <tr>
                  <td className="font-semibold">Role:</td>
                  <td>{role}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Email:</td>
                  <td>{profile.email}</td>
                </tr>
                  <tr>
                    <td className="font-semibold">Income:</td>
                    <td>Rp{profile.income}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex flex-col w-[400px] max-w-xs p-10 rounded-xl text-center">
        <h3 className="font-montserrat font-bold mb-5">Options</h3>
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
  );
};

export default ProfilePage;
