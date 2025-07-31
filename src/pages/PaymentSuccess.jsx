import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../utils/api";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?._id || !cart.length) return;
    const createInvoice = async () => {
      try {
        setLoading(true);
        const { data } = await api.post("/stripe/success", {
          userId: user._id,
          items: cart,
        });
        console.log("data", data);

        // localStorage.removeItem("cart");
        setInvoice(data);
        // navigate("/profile");
      } catch (error) {
        setError(
          "Payment succeeded but invoice failed: " +
            (error.response?.data?.error || error.message)
        );
        // navigate("/profile");
      } finally {
        setLoading(false);
      }
    };
    createInvoice();
  }, [user, cart, setCart]);
  console.log("invoice", invoice);

  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex flex-col gap-2 p-5 border-2 border-[#22333B] rounded-xl
          ${error ? "border-red-500" : !loading ? "border-green-500" : ""}
          `}
      >
        {loading && <p>Processing your payment...</p>}
        {error && <p>Error: {error}</p>}
        {invoice && (
          <>
            <p>Payment successful!</p>
            <p>Invoice: {invoice._id}</p>
            <p>Invoice items: {invoice.items.length}</p>
            <p>Invoice total: {invoice.total}</p>
          </>
        )}
      </div>
    </div>
  );
}
