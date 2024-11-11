import Image from "next/image";
import Link from "next/link";
import logo from "@public/icons/GreenGoods_transparent.png";
import { FaHome, FaTrophy } from 'react-icons/fa';
import { Search, ShoppingCart, User } from 'lucide-react'

const Header = () => {
  return (
    <header className="w-full py-6 px-10 lg:px-16">
      <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
        {/* Logo Section */}
        <div className="flex items-center gap-2 relative h-16 w-16">
          <Image
            src={logo}
            alt="Logo"
            fill
            sizes="50px"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Navigation Section - Text for Desktop, Icons for Mobile */}
        <nav className="flex gap-6">
          {/* Mobile Icons */}
          <div className="md:hidden flex gap-4">
            <Link href="/" className="text-lg">
              <FaHome size={24} className="text-primary"/>
            </Link>
            <Link href="/leaderboard" className="text-lg">
              <FaTrophy size={24} className="text-primary"/>
            </Link>
          </div>

          {/* Text Links for Desktop */}
          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-lg font-semibold hover:text-blue-600">
              Home
            </Link>
            <Link href="/leaderboard" className="text-lg font-semibold hover:text-blue-600">
              Leaderboard
            </Link>
          </div>
        </nav>

        {/* Search Bar - Inline in Desktop, Below in Mobile */}
        <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-96 px-4 py-2 rounded-lg"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <ShoppingCart className="text-white" />
            <User className="text-white" />
          </div>
      </div>
    </header>
  );
};

export default Header;