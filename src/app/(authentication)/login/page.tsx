"use client";

import Image from "next/image";
import login from "@public/images/signup.png";
import Logo from "../Logo";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8008/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      // You can redirect or handle success here
      window.location.href = "/"; // Example redirect
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col min-h-screen">
      <Logo />
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center shadow-lg bg-white">
        {/* Left Image */}
        <div className="hidden lg:block w-1/2 h-screen overflow-hidden">
          <Image
            src={login}
            alt="Login Illustration"
            width={800}
            height={800}
            className={"object-cover"}
          />
        </div>

        {/* Right Login Form */}
        <div className="px-16 w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-16 text-primary font-montserrat">
            Login
          </h2>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mb-4">
              {error}
            </p>
          )}

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-16 py-2 rounded-lg transition-colors ${
                  loading
                    ? "bg-gray-400"
                    : "bg-primary text-white hover:bg-secondary"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
