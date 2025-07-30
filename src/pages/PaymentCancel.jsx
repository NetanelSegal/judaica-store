import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PaymentCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    alert("Payment was cancelled.");
    navigate("/cart");
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Payment Cancelled</h2>
    </div>
  );
}
