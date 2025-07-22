import React, { useState } from "react";
import { api } from "../../../utils/api";
import AddCategoryForm from "./AddCategoryForm";

export default function AdminCategories({
  categories = [],
  catLoading,
  catError,
  onCategoryUpdated,
  onCategoryAdd,
}) {
  if (catLoading)
    return <div className="text-center py-8">Loading categories...</div>;
  if (catError)
    return <div className="text-center text-red-600 py-8">{catError}</div>;

  return (
    <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#22333B] flex items-center gap-2 mb-4">
        <i className="fa-solid fa-tags"></i> Categories
      </h2>
      <AddCategoryForm onCategoryAdd={onCategoryAdd} />
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#EAE0D6]">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Code</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <Category
                key={c.categoryCode}
                category={c}
                onCategoryUpdated={onCategoryUpdated}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Category({ category, onCategoryUpdated }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setEditing(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/categories/${category.categoryCode}`, {
        ...category,
        name,
      });
      setEditing(false);
      onCategoryUpdated(category.categoryCode, name);
    } catch {
      alert("Failed to update category");
    }
    setLoading(false);
  };

  if (editing) {
    return (
      <tr className="border-b last:border-none">
        <td className="py-2 px-4">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
              className="border rounded px-2 py-1 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </form>
        </td>
        <td className="py-2 px-4">{category.categoryCode}</td>
        <td className="py-2 px-4"></td>
      </tr>
    );
  }
  return (
    <tr className="border-b last:border-none">
      <td className="py-2 px-4">{category.name}</td>
      <td className="py-2 px-4">{category.categoryCode}</td>
      <td className="py-2 px-4">
        <button
          className="text-[#22333B] hover:text-green-700 text-lg"
          title="Edit"
          onClick={handleEdit}
        >
          <i className="fa-solid fa-pen"></i>
        </button>
      </td>
    </tr>
  );
}
