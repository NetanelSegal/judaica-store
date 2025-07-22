import { useEffect, useState } from "react";
import Error from "../../../components/Error";
import { api } from "../../../api";
import AddProductForm from "./AddProductForm";

export default function AdminProducts({
  categories = [],
  catLoading,
  catError,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-8">Loading products...</div>;
  if (error)
    return <div className="text-center text-red-600 py-8">{error}</div>;
  if (catLoading)
    return <div className="text-center py-8">Loading categories...</div>;
  if (catError)
    return <div className="text-center text-red-600 py-8">{catError}</div>;

  const handleProductUpdated = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const handleProductDeleted = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleAddProduct = async (form, setError, resetForm) => {
    try {
      const { data } = await api.post("/products", {
        ...form,
        price: Number(form.price),
      });
      setProducts((prev) => [...prev, data]);
      resetForm({ name: "", price: "", image: "", categoryCode: "" });
    } catch (err) {
      setError("Failed to add product");
    }
  };

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-[#22333B] flex items-center gap-2 mb-4">
        <i className="fa-solid fa-box"></i> Products
      </h2>
      <AddProductForm
        onProductAdded={handleAddProduct}
        categories={categories}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onProductUpdated={handleProductUpdated}
            onProductDeleted={handleProductDeleted}
            categories={Array.isArray(categories) ? categories : []}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onProductUpdated,
  onProductDeleted,
  categories,
}) {
  const [editing, setEditing] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
    categoryCode: product.categoryCode || "",
  });
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setForm((f) => ({ ...f, categoryCode: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!form.categoryCode) {
        setFormError("Please select a category");
        setLoading(false);
        return;
      }
      if (form.price < 0) {
        setFormError("Price must be greater than 0");
        setLoading(false);
        return;
      }
      await api.put(`/products/${product._id}`, { ...product, ...form });
      setEditing(false);
      onProductUpdated(product._id, form);
    } catch {
      alert("Failed to update product");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete product '${product.name}'?`)) return;
    setLoading(true);
    try {
      await api.delete(`/products/${product._id}`);
      onProductDeleted(product._id);
    } catch {
      alert("Failed to delete product");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white text-center rounded-xl shadow p-4 flex flex-col items-center gap-2 relative min-w-[220px]">
      {editing ? (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-2 items-center"
        >
          <Error error={formError} />
          <input
            className="border rounded px-2 py-1 w-full"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            className="border rounded px-2 py-1 w-full"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            className="border rounded px-2 py-1 w-full"
            name="image"
            value={form.image}
            onChange={handleChange}
            disabled={loading}
          />
          <CategorySelect
            value={form.categoryCode}
            categories={categories}
            onChange={handleCategoryChange}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      ) : (
        <>
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-20 object-cover rounded mb-2"
          />
          <div>
            <div className="font-bold text-lg">{product.name}</div>
            <div className="text-gray-600">
              {
                categories.find((c) => c.categoryCode === product.categoryCode)
                  ?.name
              }
            </div>
          </div>{" "}
          <div className="text-gray-600">${product.price}</div>
          <div className="flex gap-2 mt-2">
            <button
              className="text-[#22333B] hover:text-green-700 text-lg"
              title="Edit"
              onClick={handleEdit}
            >
              <i className="fa-solid fa-pen"></i>
            </button>
            <button
              className="text-red-600 hover:text-red-800 text-lg"
              title="Delete"
              onClick={handleDelete}
              disabled={loading}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function CategorySelect({ value, categories, onChange, disabled }) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="border rounded px-2 py-1 w-full"
    >
      <option value="">Select a category</option>
      {categories.map((c) => (
        <option key={c.categoryCode} value={c.categoryCode}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
