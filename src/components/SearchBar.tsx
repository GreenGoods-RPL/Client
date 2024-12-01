"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!keyword.trim()) return;

    // Navigate to the search results page with the keyword as a query parameter
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="relative w-full sm:w-80 md:w-96">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full px-4 py-2 rounded-full md:rounded-lg text-stone-900"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Search
        className="absolute right-3 top-2.5 text-gray-400 cursor-pointer hover:text-primary"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
