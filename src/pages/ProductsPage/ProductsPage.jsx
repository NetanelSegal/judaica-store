import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import FilterByCategory from "./components/FilterByCategory";
import axios from "axios";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:3000/products");
        setProducts(data);
        setError("");
      } catch (err) {
        console.log(err);
        if (err.status === 404) {
          setError("Products not found");
          return;
        }
        setError("something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.categoryCode.includes(selectedCategory)
  );

  return (
    <div>
      <div className="py-5">
        <h2 className="text-[#22333B] text-3xl font-bold text-center mb-4">
          Products
        </h2>
        <FilterByCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="flex justify-center gap-5 flex-wrap">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
