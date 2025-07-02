import React, { useEffect, useState } from "react";

export default function FilterByCategory({
  setSelectedCategory,
  selectedCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="bg-[#EAE0D6] rounded-2xl shadow-md px-6 py-4 mb-8 max-w-3xl mx-auto flex flex-col md:flex-row md:items-end gap-4">
      <div className="flex-1">
        <label
          htmlFor="category"
          className="block text-[#22333B] font-semibold mb-1"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          className="w-full rounded-lg border border-[#22333B] px-3 py-2 text-[#22333B] bg-white focus:ring-2 focus:ring-[#22333B] transition"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <button
        className="bg-[#22333B] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#1a2630] transition"
        onClick={() => setSelectedCategory("")}
      >
        Clear Filters
      </button>
    </div>
  );
}
