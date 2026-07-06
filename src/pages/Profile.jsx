import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import API_URL from "../utils/api";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("airbnbUser")) || {};
  const [reservationCount, setReservationCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [myReviews, setMyReviews] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
    fetchWishlist();
    fetchReviews();
  }, []);

  async function fetchReservations() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/reservations/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReservations(response.data);
      setReservationCount(response.data.length);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  function fetchWishlist() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setWishlistCount(favorites.length);
  }

  async function fetchReviews() {
    try {
      const response = await axios.get(`${API_URL}/api/reviews`);

      const userReviews = response.data.filter(
        (review) => review.username === user?.username,
      );

      setReviewCount(userReviews.length);

      setMyReviews(userReviews);
      if (userReviews.length > 0) {
        const total = userReviews.reduce(
          (sum, review) => sum + review.rating,
          0,
        );

        setAverageRating((total / userReviews.length).toFixed(1));
      } else {
        setAverageRating(0);
      }
    } catch (error) {
      console.error(error);

   toast.error("Unable to complete request.");
}
  }

  if (loading) {
    return (
      <div>
        <Navbar />

        <div className="loading-page">
          <LoadingSpinner message="Loading your profile..." />
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="page">
        <div className="profile-page">
          <div className="profile-card">
            <h1>My Profile</h1>

            <h2>👤 {user?.username}</h2>

            <p className="member-badge">Airbnb Member</p>

            <p>📧 {user?.email}</p>

            <div className="stats-grid">
              <div className="stat-card">
                <h2>{reservationCount}</h2>
                <p>Reservations</p>
              </div>

              <div className="stat-card">
                <h2>{wishlistCount}</h2>
                <p>Wishlist Items</p>
              </div>

              <div className="stat-card">
                <h2>{reviewCount}</h2>
                <p>Reviews</p>
              </div>

              <div className="stat-card">
                <h2>{averageRating}</h2>
                <p>Average Rating Given</p>
              </div>
            </div>

            {wishlistCount === 0 && (
              <p className="empty-message">
                You haven't saved any favourite properties yet.
              </p>
            )}

            <div className="my-reviews">
              <h3>My Reviews</h3>

              {myReviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                myReviews.map((review) => (
                  <div key={review._id} className="profile-review-card">
                    <h4>{review.accommodationTitle || "Accommodation"}</h4>

                    <p>⭐ {review.rating} / 5</p>

                    <p>{review.comment}</p>
                  </div>
                ))
              )}
            </div>

            <div className="booking-history">
              <h3>My Reservations</h3>

              {reservations.length === 0 ? (
                <p>No reservations yet.</p>
              ) : (
                reservations.map((reservation) => (
                  <div
                    key={reservation._id}
                    className="reservation-history-card"
                  >
                    <img src={reservation.image} alt={reservation.title} />

                    <div>
                      <h4>{reservation.title}</h4>

                      <p>{reservation.location}</p>

                      <p>👥 {reservation.guests} Guests</p>

                      <p>
                        📅 {new Date(reservation.checkIn).toLocaleDateString()}{" "}
                        → {new Date(reservation.checkOut).toLocaleDateString()}
                      </p>

                      <p>
                        Status:
                        <span
                          className={`status-badge ${reservation.status?.toLowerCase()}`}
                        >
                          {reservation.status || "Pending"}
                        </span>
                      </p>

                      <strong>
                        Total: R{reservation.total.toLocaleString()}
                      </strong>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
