import React, { useContext } from "react";
import CartContext from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { setCart } = useContext(CartContext);

  const handleOnRemove = () => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem._id !== item._id)
    );
  };

  const handleCountChange = (e) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: +e.target.value }
          : cartItem
      )
    );
  };

  return (
    <div
      key={item._id}
      className="flex items-center shrink-0 gap-4 overflow-hidden shadow-lg rounded-2xl border border-[#22333B] bg-[#EAE0D6] p-4"
      style={{ minHeight: 96 }}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-xl border border-gray-200 bg-gray-50"
      />
      <div className="flex flex-col items-start flex-1 justify-between h-full">
        <h3 className="font-bold text-lg text-[#22333B]">{item.name}</h3>
        <span className="text-[#22333B] font-semibold text-base">
          ₪{item.price}
        </span>
        <input
          type="number"
          min={1}
          max={item.count}
          value={item.quantity}
          onChange={handleCountChange}
          className="text-xs bg-[#22333B] text-white rounded-full px-3 py-1 w-16"
        />
        <button onClick={handleOnRemove} className="text-red-600">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
