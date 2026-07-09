import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_URL from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("airbnbUser", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>🏡 Airbnb</h1>
        <h1>Welcome Back</h1>
        <p>Sign in to continue your Airbnb journey</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}
