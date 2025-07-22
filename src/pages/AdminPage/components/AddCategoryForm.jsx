import { useState } from "react";

export default function AddCategoryForm({ onCategoryAdded, loading }) {
  const [form, setForm] = useState({ name: "", categoryCode: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (!form.name || !form.categoryCode) {
        setError("Name and code required");
        setSubmitting(false);
        return;
      }
      await onCategoryAdded(form, setError, setForm);
      setForm({ name: "", categoryCode: "" });
    } finally {
      setSubmitting(false);
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
        disabled={loading || submitting}
      />
      <input
        className="border rounded px-2 py-1"
        placeholder="Category Code"
        name="categoryCode"
        value={form.categoryCode}
        onChange={handleChange}
        disabled={loading || submitting}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
        disabled={loading || submitting}
      >
        {(loading || submitting) ? "Adding..." : "Add Category"}
      </button>
      {error && <span className="text-red-600 ml-2">{error}</span>}
    </form>
  );
}
