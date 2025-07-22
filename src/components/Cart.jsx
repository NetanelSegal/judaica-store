import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      _id: "687c930fad8fb9da454f5fd6",
      name: "Sterling Silver Kiddush Cup",
      image:
        "https://hazorfim.co.il/dw/image/v2/BFZQ_PRD/on/demandware.static/-/Sites-hazorfim-master-catalog/default/dw0b0bf3a2/images/hi-res/20528-0130.jpg?sw=670&sh=670",
      categoryCode: "kiddush_items",
      price: 109.99,
      count: 20,
      __v: 0,
    },
    {
      _id: "687c930fad8fb9da454f5fd7",
      name: "Havdalah Set",
      image:
        "https://cdn11.bigcommerce.com/s-gtyjsq0orx/images/stencil/1280x1280/products/16502/16403/Ornate-Silver-Plated-Havdalah-Set-CO4213__74543.1666113042.jpg?c=1",
      categoryCode: "kiddush_items",
      price: 10,
      count: 5,
      __v: 0,
    },
  ]);
  const [open, setOpen] = useState(false);

  const toggleCart = () => setOpen(!open);
  return (
    <div className="relative">
      <button
        onClick={toggleCart}
        className="cursor-pointer bg-[#EAE0D6] text-[#22333B] border-[#22333B] size-10 font-semibold hover:bg-[#22333B] hover:border-[#EAE0D6] rounded-full hover:text-white border-2 transition"
      >
        <i className="fa-solid fa-bag-shopping " />
      </button>
      {open && (
        <div className="absolute bg-white shadow-2xl rounded-2xl z-50 top-[100%] right-0">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          <button className="absolute top-2 right-2" onClick={toggleCart}>
            <i className="fa-solid fa-xmark" />
          </button>
          <div className="flex flex-col gap-2 p-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex border-2 border-[#22333B] text-black flex-row gap-2"
              >
                <img src={item.image} alt={item.name} className="size-20" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
