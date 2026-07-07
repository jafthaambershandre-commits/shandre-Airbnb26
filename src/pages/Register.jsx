import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      console.log(error);

      toast.error("Registration failed.");
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
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
          <option value="user">User</option>
          <option value="host">Host</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
