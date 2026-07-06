import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ListingCard({
  id,
  image,
  title,
  location,
  price,
  rating,
  type,
}) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setIsFavorite(favorites.some((item) => item._id === id));
  }, [id]);

  function toggleWishlist() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((item) => item._id !== id);

      toast.info(`${title} removed from wishlist`);
    } else {
      favorites.push({
        _id: id,
        image,
        title,
        location,
        price,
        rating,
      });

      toast.success(`${title} added to wishlist ❤️`);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    setIsFavorite(!isFavorite);

    window.dispatchEvent(new Event("wishlistUpdated"));
  }

  return (
    <Link to={`/listing/${id}`} className="listing-link">
      <div className="listing-card">
        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist();
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {Number(rating) >= 4.8 && (
          <div className="guest-favorite-badge">🏆 Guest Favorite</div>
        )}
        <img src={image} alt={title} />

        <div className="listing-info">
          <div className="listing-top">
            <h3>{title}</h3>

            <span className="rating">⭐ {Number(rating).toFixed(1)}</span>
          </div>

          <p
            className="listing-location"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/location/${location}`);
            }}
          >
            {location}
          </p>

          <p className="listing-distance">{type}</p>

          <p className="listing-dates">Available this week</p>

          <div className="listing-price">
            <strong>R{price.toLocaleString()}</strong> night
          </div>
        </div>
      </div>
    </Link>
  );
}
