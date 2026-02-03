// src/pages/Home.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // ✅ Protect the page: redirect to login if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Sample products
  const products = [
    { id: 1, name: "Product 1", price: 499, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: 899, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", price: 1299, image: "https://via.placeholder.com/150" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Welcome to Home Page 🎉</h1>
        <button onClick={handleLogout} style={{ padding: "10px 20px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <button
        onClick={() => navigate("/cart")}
        style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }}
      >
        Go to Cart
      </button>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={() => addToCart(product)} />
        ))}
      </div>
    </div>
  );
}

export default Home;