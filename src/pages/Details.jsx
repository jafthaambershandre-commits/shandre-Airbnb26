import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import API_URL from "../utils/api";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "New";

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchReviews();
  }, [id]);

  async function fetchReviews() {
    try {
      const response = await axios.get(
        `${API_URL}/api/reviews/${id}`,
      );

      setReviews(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  async function submitReview() {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!comment.trim()) {
      toast.warning("Please write a review");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/reviews`, {
        accommodationId: id,
        accommodationTitle: listing.title,
        username: user.username,
        rating,
        comment,
      });

      setComment("");
      setRating(5);
      fetchReviews();
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  const user = JSON.parse(localStorage.getItem("airbnbUser"));

  useEffect(() => {
    fetchListing();
  }, [id]);

  useEffect(() => {
    if (!listing) return;

    const recent = JSON.parse(localStorage.getItem("recentListings")) || [];

    const filtered = recent.filter((item) => item._id !== listing._id);

    filtered.unshift(listing);

    localStorage.setItem(
      "recentListings",
      JSON.stringify(filtered.slice(0, 5)),
    );
  }, [listing]);

  async function fetchListing() {
    try {
      const response = await axios.get(
        `${API_URL}/api/accommodations/${id}`,
      );

      setListing(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  if (!listing) {
    return (
      <div>
        <Navbar />

        <div className="loading-page">
          <LoadingSpinner message="Loading listing..." />
        </div>

        <Footer />
      </div>
    );
  }

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
        )
      : 0;

  const cleaningFee = 450;

  const serviceFee = nights > 0 ? Math.round(listing.price * nights * 0.12) : 0;

  const taxes = nights > 0 ? Math.round(listing.price * nights * 0.08) : 0;

  const discount = nights >= 7 ? Math.round(listing.price * nights * 0.1) : 0;

  const subtotal = listing.price * nights;

  const total = subtotal + cleaningFee + serviceFee + taxes - discount;

  async function handleReservation() {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      if (!checkIn || !checkOut) {
        toast.warning("Please select check-in and check-out dates");
        return;
      }

      if (nights <= 0) {
        toast.warning("Check-out must be after check-in.");
        return;
      }

      if (guests < 1) {
        toast.warning("Guests must be at least 1");
        return;
      }

      const reservationData = {
        listingId: listing._id,
        userId: user._id,
        title: listing.title,
        location: listing.location,
        image: listing.image,
        price: listing.price,
        guests,
        checkIn,
        checkOut,
        total,
        username: user.username,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/reservations`,

        reservationData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Your reservation has been confirmed!");
      setCheckIn("");
      setCheckOut("");
      setGuests(1);

      navigate("/reservations");
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  function getAmenityIcon(amenity) {
    const text = amenity.toLowerCase();

    if (text.includes("wifi")) return "📶";
    if (text.includes("pool")) return "🏊";
    if (text.includes("kitchen")) return "🍳";
    if (text.includes("parking")) return "🚗";
    if (text.includes("tv")) return "📺";
    if (text.includes("air")) return "❄️";
    if (text.includes("washer")) return "🧺";
    if (text.includes("dryer")) return "🧦";
    if (text.includes("coffee")) return "☕";
    if (text.includes("pet")) return "🐶";
    if (text.includes("workspace")) return "💻";
    if (text.includes("fireplace")) return "🔥";

    return "✔️";
  }

  return (
    <div>
      <Navbar />

      <div className="page">
        <div className="details-page">
          <h1>{listing.title}🏆 Superhost Favorite</h1>

          <p>
            ⭐ {averageRating} ({reviews.length} reviews) · {listing.location}
          </p>
          {Number(averageRating) >= 4.8 && (
            <span className="guest-favorite">🏆 Guest Favorite</span>
          )}

          <div className="image-gallery">
            <div className="main-image">
              <img
                src={listing.image}
                alt={listing.title}
                onClick={() => setSelectedImage(listing.image)}
              />
            </div>

            <div className="side-images">
              {[1, 2, 3, 4].map((item) => (
                <img
                  key={item}
                  src={listing.image}
                  alt={listing.title}
                  onClick={() => setSelectedImage(listing.image)}
                />
              ))}
            </div>
          </div>

          {showGallery && (
            <div
              className="gallery-modal"
              onClick={() => setShowGallery(false)}
            >
              <div
                className="gallery-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-gallery"
                  onClick={() => setShowGallery(false)}
                >
                  ✕
                </button>

                <img src={listing.image} alt={listing.title} />
              </div>
            </div>
          )}

          <div className="details-layout">
            <div className="details-left">
              <h2>About this stay</h2>

              <h3>🏡 Entire home</h3>
              <p>You'll have the whole place to yourself.</p>

              <h3>🔑 Self check-in</h3>
              <p>Check yourself in with a keypad.</p>

              <h3>🛜 Fast Wi-Fi</h3>
              <p>Perfect for remote work..</p>

              <h3>📍 Great location</h3>
              <p>95% of guests gave the location 5 stars.</p>

              <div className="host-section">
                <div className="host-card">
                  <div className="host-avatar">👩‍💼</div>

                  <div className="host-details">
                    <h3>Hosted by Airbnb Host</h3>

                    <p>⭐ Superhost</p>

                    <p>3 years hosting experience</p>

                    <p>Response rate: 100%</p>

                    <p>Usually Response time within an hour</p>

                    <p>Committed to providing great stays.</p>

                    <button className="contact-host-btn">Contact Host</button>
                  </div>
                </div>
              </div>

              <div className="sleep-section">
                <h3>Where you'll sleep</h3>

                <div className="sleep-card">
                  <h4>🛏 Bedroom</h4>
                  <p>1 Queen Bed</p>
                </div>

                <div className="sleep-card">
                  <h4>🛋 Living Area</h4>
                  <p>Comfort Sofa</p>
                </div>
              </div>

              <div className="amenities-section">
                <h2>What this place offers</h2>

                <div className="amenities-grid">
                  {listing.amenities?.length > 0 ? (
                    listing.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-card">
                        <span className="amenity-icon">
                          {getAmenityIcon(amenity)}
                        </span>

                        <p>{amenity}</p>
                      </div>
                    ))
                  ) : (
                    <p>No amenities listed.</p>
                  )}
                </div>
              </div>

              <div className="things-section">
                <h2>Things to know</h2>

                <div className="things-grid">
                  <div className="thing-card">
                    <h3>🏠 House Rules</h3>

                    <p>Check-in after 2 PM</p>

                    <p>No smoking</p>

                    <p>No parties</p>
                  </div>

                  <div className="thing-card">
                    <h3>🛡 Safety</h3>

                    <p>✔ Smoke alarm installed</p>

                    <p>✔ First aid kit available</p>

                    <p>✔ Fire extinguisher</p>
                  </div>

                  <div className="thing-card">
                    <h3>❌ Cancellation Policy</h3>

                    <p>
                      {" "}
                      Free cancellation within 48 hours. After that, partial
                      refunds may apply.
                    </p>
                  </div>
                </div>
              </div>

              <div className="map-section">
                <h2>Where you'll be</h2>

                <div className="fake-map">📍 {listing.location}</div>
              </div>

              <p>
                {listing.description ||
                  `Beautiful accommodation located in ${listing.location}.`}
              </p>
            </div>

            <div className="details-right">
              <div className="reservation-box">
                <h2>
                  R{listing.price.toLocaleString()}
                  <span>/ night</span>
                </h2>

                <div className="booking-inputs">
                  <div>
                    <label>Check In</label>

                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Check Out</label>

                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Guests</label>

                    <input
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>
                      R{listing.price.toLocaleString()} × {nights} night
                      {nights !== 1 && "s"}
                    </span>

                    <span>R{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="price-row">
                    <span>Cleaning fee</span>

                    <span>R{cleaningFee.toLocaleString()}</span>
                  </div>

                  <div className="price-row">
                    <span>Service fee</span>

                    <span>R{serviceFee.toLocaleString()}</span>
                  </div>

                  <div className="price-row">
                    <span>Taxes</span>

                    <span>R{taxes.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="price-row discount">
                      <span>Weekly Discount</span>

                      <span>-R{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <hr />

                  <div className="price-total">
                    <strong>Total</strong>

                    <strong>R{total.toLocaleString()}</strong>
                  </div>
                </div>

                <button onClick={handleReservation}>Reserve your stay</button>
              </div>
            </div>
          </div>

          <div className="stay-summary">
            <h2>
              {nights > 0
                ? `${nights} night${nights > 1 ? "s" : ""} in ${listing.location}`
                : `Choose your dates`}
            </h2>
          </div>

          <div className="reviews-section">
            <p>
              ⭐ {averageRating} based on {reviews.length} reviews
            </p>

            <h2>Reviews ({reviews.length})</h2>

            {user ? (
              <div className="review-form">
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value={5}>5 Stars</option>

                  <option value={4}>4 Stars</option>

                  <option value={3}>3 Stars</option>

                  <option value={2}>2 Stars</option>

                  <option value={1}>1 Star</option>
                </select>

                <textarea
                  placeholder="Write a review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button className="review-btn" onClick={submitReview}>
                  Submit Review
                </button>
              </div>
            ) : (
              <p>Please login to leave a review.</p>
            )}

            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </div>

        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="" />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
