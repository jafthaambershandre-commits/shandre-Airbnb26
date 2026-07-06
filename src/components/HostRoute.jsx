import { Navigate } from "react-router-dom";

export default function HostRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("airbnbUser"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "host") {
    return <Navigate to="/" />;
  }

  return children;
}