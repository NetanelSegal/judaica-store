import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import FilterByCategory from "./components/FilterByCategory";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.category.includes(selectedCategory)
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
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
