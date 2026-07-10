import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Wishlist() {
  const [favorites, setFavorites] = useState([]);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadFavorites() {
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      setFavorites(savedFavorites);

      setLoading(false);
    }

    loadFavorites();

    window.addEventListener("wishlistUpdated", loadFavorites);

    return () => window.removeEventListener("wishlistUpdated", loadFavorites);
  }, []);

  function removeFavorite(id) {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite._id !== id,
    );

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setSuccess("Property removed from wishlist ❤️");

    setTimeout(() => {
      setSuccess("");
    }, 2500);
  }

  if (loading) {
    return (
      <div>
        <Navbar />

        <div className="loading-page">
          <LoadingSpinner message="Loading wishlist..." />
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="page">
        <div className="wishlist-page">
          <h1>❤️ My Wishlist</h1>

          {success && <p className="success">{success}</p>}

          {favorites.length === 0 ? (
            <div className="empty-state">
              <h2>❤️ Your wishlist is empty</h2>

              <p>Start exploring amazing stays and save your favorites.</p>

              <button className="browse-btn" onClick={() => navigate("/")}>
                Browse Listings
              </button>
            </div>
          ) : (
            <div className="listings-grid">
              {favorites.map((listing) => (
                <div key={listing._id} className="wishlist-item">
                  <ListingCard
                    id={listing._id}
                    image={listing.image}
                    title={listing.title}
                    location={listing.location}
                    price={listing.price}
                    rating={listing.rating}
                  />

                  <button
                    className="remove-favorite-btn"
                    onClick={() => removeFavorite(listing._id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
