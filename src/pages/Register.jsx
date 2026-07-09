import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_URL from "../utils/api";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/users/register`, {
        username,
        email,
        password,
        role,
      });

      toast.success("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Registration failed.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>🏡 Airbnb</h1>
        <h1>Create your account</h1>

        <p>Join Airbnb and start exploring amazing places.</p>

        <form className="auth-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Guest Account</option>
            <option value="host">Become a Host</option>
          </select>

          <button type="submit">Create Account</button>
        </form>

        <p className="auth-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}
