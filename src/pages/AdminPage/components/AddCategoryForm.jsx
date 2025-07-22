import { useState } from "react";

export default function AddCategoryForm({ onCategoryAdd }) {
  const [form, setForm] = useState({ name: "", categoryCode: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!form.name || !form.categoryCode) {
        setError("Name and code required");
        setLoading(false);
        return;
      }
      await onCategoryAdd(form);
      setForm({ name: "", categoryCode: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 items-end">
      <input
        className="border rounded px-2 py-1"
        placeholder="Category Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        className="border rounded px-2 py-1"
        placeholder="Category Code"
        name="categoryCode"
        value={form.categoryCode}
        onChange={handleChange}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Category"}
      </button>
      {error && <span className="text-red-600 ml-2">{error}</span>}
    </form>
  );
}
