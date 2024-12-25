'use client';

import React, { useEffect, useState } from "react";
import { getAddresses, addAddress, deleteAddress } from "@/services/user";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [error, setError] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    const fetchAddresses = async () => {
      try {
        const response = await getAddresses(token);
        setAddresses(Array.isArray(response) ? response : []); // Ensure response is an array
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [token]);

  const handleDeleteAddress = async (id) => {
    if (!token) return;

    setDeletingAddressId(id);
    setError(null);
    try {
      await deleteAddress(token, id);
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Failed to delete address:", error);
      setError("Failed to delete address. Please try again.");
    } finally {
      setDeletingAddressId(null);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!token) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const addedAddress = await addAddress(newAddress, token);
      
      setAddresses((prev) => [...prev, addedAddress.address]);
      setNewAddress({ street: "", city: "", country: "", postalCode: "" });
    } catch (error) {
      console.error("Failed to add address:", error);
      setError("Failed to add address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Addresses</h1>

          {/* Error Message */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {/* Add Address Form */}
          <div className="mb-8">
            <form
              onSubmit={handleAddAddress}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Address</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Postal Code"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Address"}
              </button>
            </form>
          </div>

          {/* Address List */}
          {isLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div key={address.id} className="bg-neutral shadow-md rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Street: <span className="text-blue-500">{address.street}</span>
                  </h2>
                  <p className="text-gray-600 mt-2">
                    City: <span className="text-gray-800">{address.city}</span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Country: <span className="text-gray-800">{address.country}</span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Postal Code: <span className="text-gray-800">{address.postalCode}</span>
                  </p>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="mt-4 w-full bg-red-400 text-white py-2 px-4 rounded-full hover:bg-red-500"
                    disabled={deletingAddressId === address.id}
                    aria-disabled={deletingAddressId === address.id}
                  >
                    {deletingAddressId === address.id ? "Deleting..." : "Delete Address"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No addresses found.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
