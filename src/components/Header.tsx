import Image from "next/image";
import logo from "@public/icons/GreenGoods_transparent.png";
import { FaHome, FaTrophy } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="w-full p-4">
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
            <a href="/" className="text-lg">
              <FaHome size={24} className="text-primary"/>
            </a>
            <a href="/leaderboard" className="text-lg">
              <FaTrophy size={24} className="text-primary"/>
            </a>
          </div>

          {/* Text Links for Desktop */}
          <div className="hidden md:flex gap-6">
            <a href="/" className="text-lg font-semibold text-primary hover:text-secondary">
              Home
            </a>
            <a href="/leaderboard" className="text-lg font-semibold text-primary hover:text-secondary">
              Leaderboard
            </a>
          </div>
        </nav>

        {/* Search Bar - Inline in Desktop, Below in Mobile */}
        <div className="relative w-full md:w-[350px] xl:w-[700px] mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-10 px-4 border-2 border-gray-300 rounded-full focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;