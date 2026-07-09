import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import airbnbLogo from "../assets/airbnb-logo.svg";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("airbnbUser"));
  const navigate = useNavigate();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);

  useEffect(() => {
    function updateCounts() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      const reservations =
        JSON.parse(localStorage.getItem("reservations")) || [];

      setWishlistCount(favorites.length);
      setReservationCount(reservations.length);
    }

    updateCounts();

    window.addEventListener("storage", updateCounts);

    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  function handleLogout() {
    localStorage.removeItem("airbnbUser");
    localStorage.removeItem("token");

    window.location.href = "/login";
  }

  return (
    <header className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo">
          <img src={airbnbLogo} alt="Airbnb Logo" />
        </Link>

        <div className="navbar-right">
          {user?.role === "host" ? (
            <button className="host-btn" onClick={() => navigate("/admin")}>
              Dashboard
            </button>
          ) : (
            <button className="host-btn" onClick={() => navigate("/admin")}>
              Become a Host
            </button>
          )}

          <button className="globe-btn">🌐</button>

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

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowMenu(false);
                      }}
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/wishlist");
                        setShowMenu(false);
                      }}
                    >
                      Wishlist ({wishlistCount})
                    </button>

                    <button
                      onClick={() => {
                        navigate("/reservations");
                        setShowMenu(false);
                      }}
                    >
                      Reservations ({reservationCount})
                    </button>

                    <button
                      onClick={() => {
                        navigate("/admin");
                        setShowMenu(false);
                      }}
                    >
                      Admin Dashboard
                    </button>

                    <button onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/login")}>Login</button>

                    <button onClick={() => navigate("/register")}>
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navbar-tabs">
        <Link to="/">Homes</Link>

        <Link to="/listings">Explore</Link>
      </div>

      <div className="navbar-search">
        <div className="search-item">
          <strong>Where</strong>
          <span>Search destinations</span>
        </div>

        <div className="divider"></div>

        <div className="search-item">
          <strong>When</strong>
          <span>Add dates</span>
        </div>

        <div className="divider"></div>

        <div className="search-item">
          <strong>Guests</strong>
          <span>Add guests</span>
        </div>

        <button className="search-btn">
          <FiSearch size={18} />
        </button>
      </div>
    </header>
  );
}
