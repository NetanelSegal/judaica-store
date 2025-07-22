import { useContext, useState } from "react";
import CartContext from "../contexts/CartContext";

function ProductCard({ product }) {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (count) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, count: +item.count + +count }
            : item
        );
      }
      return [...prevCart, { ...product, count }];
    });
  };

  return (
    <div className="bg-white shrink-0 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all w-full max-w-xs">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain"
      />
      <div className="p-4 space-y-2 w-full">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="text-lg font-bold text-green-600">
          ₪{product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-700">In stock: {product.count}</p>
        <AddToCartButton onAddToCart={addToCart} maxCount={product.count} />
      </div>
    </div>
  );
}

export default ProductCard;

function AddToCartButton({ onAddToCart, maxCount }) {
  const [count, setCount] = useState(1);

  return (
    <div className="flex gap-2">
      <input
        min={1}
        max={maxCount}
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="w-1/2 px-2 py-1 border rounded"
      />
      <button
        onClick={() => onAddToCart(count)}
        className="w-full inline-block text-center px-4 py-2 bg-[#22333B] text-white text-sm rounded-xl hover:scale-105 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
