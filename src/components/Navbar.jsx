import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("airbnbUser"));

  const [wishlistCount, setWishlistCount] = useState(0);

  const [reservationCount, setReservationCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    function updateWishlistCount() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      setWishlistCount(favorites.length);
    }

    updateWishlistCount();

    window.addEventListener("storage", updateWishlistCount);

    return () => window.removeEventListener("storage", updateWishlistCount);

    <Link to="/reservations">📅 Reservations ({reservationCount})</Link>;
  }, []);

  function handleLogout() {
    localStorage.removeItem("airbnbUser");
    localStorage.removeItem("token");

    window.location.href = "/login";
  }

  return (
    <header className="navbar">

  <Link to="/" className="navbar-logo">
    <h2>airbnb</h2>
  </Link>

  <div className="navbar-center">

    <Link to="/">Homes</Link>

    <Link to="/listings">Experiences</Link>

  </div>

  <div className="navbar-right">

    <button
      className="host-btn"
      onClick={() => navigate("/admin")}
    >
      Become a Host
    </button>

    <button className="globe-btn">
      🌐
    </button>

    <div className="profile-menu">

      <button
        className="profile-btn"
        onClick={() => setShowMenu(!showMenu)}
      >
        ☰ 👤
      </button>

      {showMenu && (
        <div className="dropdown-menu">

          {user ? (
            <>
              <p>Hello, {user.username}</p>

              <button onClick={() => navigate("/profile")}>
                Profile
              </button>

              <button onClick={() => navigate("/wishlist")}>
                Wishlist ({wishlistCount})
              </button>

              <button onClick={() => navigate("/reservations")}>
                Reservations
              </button>

              <button onClick={() => navigate("/admin")}>
                Admin Dashboard
              </button>

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>
                Login
              </button>

              <button onClick={() => navigate("/register")}>
                Register
              </button>
            </>
          )}

        </div>
      )}

    </div>

  </div>

</header>
  );
}
