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

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    
    setIsAuthenticated(!!token);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/");
  };

  const handleSearchResults = (results: any[]) => {
    if (results) {
      router.push(`/search?keyword=${results.keyword}`);
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
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
