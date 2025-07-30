import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { api } from "../utils/api";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if (!user?._id || !cart.length) {
      navigate("/products");
      return;
    }
    api
      .post("/stripe/success", { userId: user._id, items: cart })
      .then((res) => {
        setCart([]);
        localStorage.removeItem("cart");
        alert("Payment successful! Invoice created.");
        navigate("/products");
      })
      .catch((err) => {
        alert(
          "Payment succeeded but invoice failed: " +
            (err.response?.data?.error || err.message)
        );
        navigate("/products");
      });
    // eslint-disable-next-line
  }, [navigate, user, cart, setCart]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Processing your payment...</h2>
    </div>
  );
}
