import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import HostRoute from "./components/HostRoute";
import Reservations from "./pages/Reservations";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Location from "./pages/Location";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/listings" element={<Listings />} />

        <Route path="/listing/:id" element={<Details />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <HostRoute>
              <Admin />
            </HostRoute>
          }
        />

        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Reservations />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />

        <Route path="/location/:city" element={<Location />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
