import React, { useEffect, useState } from "react";
import { api } from "../../../utils/api";

export default function FilterByCategory({
  setSelectedCategory,
  selectedCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (err) {
        console.log(err);
        if (err.status === 404) {
          setError("Categories not found");
          return;
        }
        setError("something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
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
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <select
          id="category"
          name="category"
          className="w-full rounded-lg border border-[#22333B] px-3 py-2 text-[#22333B] bg-white focus:ring-2 focus:ring-[#22333B] transition"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option value={c.categoryCode} key={c._id}>
              {c.name}
            </option>
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
