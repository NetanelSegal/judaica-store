import React from "react";

const CartItem = ({ item }) => {
  return (
    <div
      key={item._id}
      className="flex items-center shrink-0 gap-4 overflow-hidden shadow-lg rounded-2xl border border-[#22333B] bg-white p-4 transition-transform hover:scale-[1.025] hover:shadow-xl"
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
        <span className="text-xs bg-[#22333B] text-white rounded-full px-3 py-1 ml-2">
          x{item.count}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
