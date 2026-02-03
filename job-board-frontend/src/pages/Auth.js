import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/signup"
        : "http://localhost:5000/api/auth/login";

      const payload = isSignup ? { name, email, password } : { email, password };
      const res = await axios.post(url, payload);

      setMessage(res.data.message);
      if (isSignup) {
        setName(""); setEmail(""); setPassword("");
        navigate("/dashboard");
      } else if (res.data.message === "Login successful") {
        setEmail(""); setPassword("");
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", borderRadius: "10px", backgroundColor: "#f0f8ff", boxShadow: "0 0 10px #aaa" }}>
      <h2 style={{ textAlign: "center" }}>{isSignup ? "Signup" : "Login"}</h2>

      {isSignup && (
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
      )}

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button onClick={handleSubmit} style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none" }}>
        {isSignup ? "Signup" : "Login"}
      </button>

      {message && <p style={{ textAlign: "center", marginTop: "10px", color: "blue" }}>{message}</p>}

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <span onClick={() => { setIsSignup(!isSignup); setMessage(""); }} style={{ color: "green", cursor: "pointer", marginLeft: "5px" }}>
          {isSignup ? "Login" : "Signup"}
        </span>
      </p>
    </div>
  );
}

export default Auth;