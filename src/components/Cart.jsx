import { useState } from "react";
import CartItem from "./CartItem";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();

  const toggleCart = () => setOpen(!open);

  const clearCart = () => setCart([]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Send cart info to backend to create a Stripe Checkout session
      const { data } = await axios.post(
        "http://localhost:3000/create-checkout-session",
        {
          items: cart,
        }
      );

      window.location.href = data;
    } catch (err) {
      alert("Failed to start checkout");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className="cursor-pointer bg-[#EAE0D6] text-[#22333B] border-[#22333B] size-10 font-semibold hover:bg-[#22333B] hover:border-[#EAE0D6] rounded-full hover:text-white border-2 transition"
      >
        <i className="fa-solid fa-bag-shopping " />
      </button>
      {open && (
        <div className="absolute text-black p-5 bg-white shadow-2xl rounded-2xl z-50 top-[calc(100%+10px)] right-0">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          <div className="flex flex-col  gap-2 w-72 mb-2">
            <p>Total: ₪{cart.reduce((total, item) => total + item.price, 0)}</p>
            <div className="flex gap-2">
              <button
                className="w-full inline-block text-center px-4 py-2 bg-[#22333B] text-white text-sm rounded-xl hover:scale-105 transition disabled:opacity-50"
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
              <button
                onClick={clearCart}
                className="w-full inline-block text-center bg-red-500 px-4 py-2  text-white text-sm rounded-xl hover:scale-105 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <button className="absolute top-2 right-2" onClick={toggleCart}>
            <i className="fa-solid fa-xmark" />
          </button>
          <div className="flex flex-col gap-2 w-72 max-h-[calc(100vh-200px)] overflow-y-auto">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
