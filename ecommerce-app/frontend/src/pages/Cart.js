// src/pages/Cart.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, totalPrice } = useContext(CartContext);

  // ✅ Protect the page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1>Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>{item.name} - ₹{item.price}</span>
              <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Remove</button>
            </div>
          ))}

          <h3>Total: ₹{totalPrice}</h3>

          <button
            onClick={() => navigate("/checkout")}
            style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;