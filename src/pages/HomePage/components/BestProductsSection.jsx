import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";

export default function BestProductsSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, []);

  return (
    <div className="py-5 bg-[#EAE0D6]">
      <h2 className="text-[#22333B] text-3xl font-bold text-center pb-5">
        Best Products
      </h2>
      <div className="flex justify-center gap-5 flex-wrap">
        {products.slice(0, 3).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
