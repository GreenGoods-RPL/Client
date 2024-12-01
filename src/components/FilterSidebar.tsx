import React, { useState } from "react";

interface FilterSidebarProps {
  onApplyFilters: (filters: {
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    minEcoScore?: string;
  }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onApplyFilters }) => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [minEcoScore, setMinEcoScore] = useState<string>("");

  const handleApply = () => {
    onApplyFilters({
      minPrice,
      maxPrice,
      rating,
      minEcoScore,
    });
  };

  return (
    <aside className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Price</h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 px-2 py-1 border rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 px-2 py-1 border rounded"
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Rating</h4>
          <input
            type="number"
            step="0.1"
            placeholder="Min Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Eco Score
          </h4>
          <input
            type="number"
            placeholder="Min Eco Score"
            value={minEcoScore}
            onChange={(e) => setMinEcoScore(e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <button
          onClick={handleApply}
          className="w-full bg-secondary text-white py-2 rounded-full hover:bg-primary"
        >
          Apply
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
