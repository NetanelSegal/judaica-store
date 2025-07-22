import { useContext } from "react";
import CartContext from "../contexts/CartContext";

function ProductCard({ product }) {
  const { setCart } = useContext(CartContext);

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
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
        <button
          onClick={addToCart}
          className="w-full inline-block text-center px-4 py-2 bg-[#22333B] text-white text-sm rounded-xl hover:scale-105 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
