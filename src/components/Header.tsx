"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@public/icons/GreenGoods_transparent.png";
import { User } from "lucide-react";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null); // To store user role

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the token
        const userRole = decodedToken.role;
        
        setRole(userRole);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole(null);
    router.push("/");
  };

  const handleSearchResults = (results: any[]) => {
    if (results) {
      router.push(`/search?keyword=${results.keyword}`);
    }
  };

  const renderDropdownContent = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-200">
            Login
          </Link>
          <Link href="/signup" className="block px-4 py-2 text-sm hover:bg-gray-200">
            Sign Up
          </Link>
        </>
      );
    }

    // Dynamic menu based on role
    switch (role) {
      case "admin":
        return (
          <>
            <Link href="/admin/dashboard" className="block px-4 py-2 text-sm">
              Admin Dashboard
            </Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm">
              Logout
            </button>
          </>
        );
      case "seller":
        return (
          <>
            <Link href="/seller" className="block px-4 py-2 text-sm">
              My Profile
            </Link>
            <Link href="/orders" className="block px-4 py-2 text-sm">
              My Orders
            </Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm">
              Logout
            </button>
          </>
        );
      case "user":
      default:
        return (
          <>
            <Link href="/profile" className="block px-4 py-2 text-sm">
              My Profile
            </Link>
            <Link href="/transactions" className="block px-4 py-2 text-sm">
              Transactions
            </Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm">
              Logout
            </button>
          </>
        );
    }
  };

  return (
    <header className="w-full py-6 px-6 md:px-10 lg:px-16 text-white">
      <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
        {/* Logo Section */}
        <div className="flex items-center gap-2 relative h-12 w-12 md:h-16 md:w-16">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              fill
              sizes="50px"
              style={{ objectFit: "contain" }}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex gap-6">
          <div className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-lg font-semibold text-primary hover:text-secondary"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg font-semibold text-primary hover:text-secondary"
            >
              About Us
            </Link>
            <Link
              href="/leaderboard"
              className="text-lg font-semibold text-primary hover:text-secondary"
            >
              Leaderboard
            </Link>
          </div>
        </nav>

        {/* Search Bar and Icons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          {/* SearchBar */}
          <SearchBar onSearchResults={handleSearchResults} />

          {/* User Dropdown */}
          <div className="relative">
            <User
              className="text-primary cursor-pointer mx-5"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
                {renderDropdownContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
