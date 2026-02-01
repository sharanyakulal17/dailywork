// src/pages/Checkout.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // ✅ Protect the page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleCheckout = (e) => {
    e.preventDefault();
    alert(`Order placed successfully! Total: ₹${totalPrice}`);
    clearCart();
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Checkout 🛒</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty</p>
      ) : (
        <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <h3>Total: ₹{totalPrice}</h3>
          <button
            type="submit"
            style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;