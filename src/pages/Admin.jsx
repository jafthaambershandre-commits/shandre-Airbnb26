import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";
import SkeletonCard from "../components/SkeletonCard";
import axios from "axios";
import API_URL from "../utils/api";

export default function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("airbnbUser"));
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [guests, setGuests] = useState("");
  const [amenities, setAmenities] = useState("");
  const [weeklyDiscount, setWeeklyDiscount] = useState("");
  const [cleaningFee, setCleaningFee] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [occupancyTaxes, setOccupancyTaxes] = useState("");
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [listingSearch, setListingSearch] = useState("");
  const [reservationSearch, setReservationSearch] = useState("");
  const [reviewSearch, setReviewSearch] = useState("");
  const [images, setImages] = useState("");
  const [stats, setStats] = useState({
    listings: 0,
    reservations: 0,
    reviews: 0,
  });

  const confirmedReservations = reservations.filter(
    (reservation) => reservation.status === "Confirmed",
  );

  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === "Pending",
  );

  const cancelledReservations = reservations.filter(
    (reservation) => reservation.status === "Cancelled",
  );

  const totalRevenue = confirmedReservations.reduce(
    (sum, reservation) => sum + Number(reservation.total || 0),
    0,
  );

  const reservationData = [
    {
      name: "Confirmed",
      value: confirmedReservations.length,
    },
    {
      name: "Pending",
      value: pendingReservations.length,
    },
    {
      name: "Cancelled",
      value: cancelledReservations.length,
    },
  ];

  const revenueData = reservations
    .filter((reservation) => reservation.status === "Confirmed")
    .map((reservation) => ({
      name: new Date(reservation.checkIn).toLocaleDateString(),

      amount: Number(reservation.total || 0),
    }));

  const averageBookingValue =
    confirmedReservations.length > 0
      ? (totalRevenue / confirmedReservations.length).toFixed(2)
      : 0;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(listingSearch.toLowerCase()) ||
      listing.location.toLowerCase().includes(listingSearch.toLowerCase()),
  );

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.username
        ?.toLowerCase()
        .includes(reservationSearch.toLowerCase()) ||
      reservation.title
        ?.toLowerCase()
        .includes(reservationSearch.toLowerCase()),
  );

  const filteredReviews = reviews.filter(
    (review) =>
      review.username?.toLowerCase().includes(reviewSearch.toLowerCase()) ||
      review.accommodationTitle
        ?.toLowerCase()
        .includes(reviewSearch.toLowerCase()),
  );

  useEffect(() => {
    fetchListings();
    fetchStats();
    fetchReservations();
    fetchReviews();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("airbnbUser"));

    if (!user || user.role !== "host") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  async function fetchListings() {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/api/accommodations`);

      setListings(res.data);
    } catch (error) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const listingsResponse = await axios.get(`${API_URL}/api/accommodations`);

      const reservationsResponse = await axios.get(
        `${API_URL}/api/reservations`,
      );

      const reviewsResponse = await axios.get(`${API_URL}/api/reviews`);

      setStats({
        listings: listingsResponse.data.length,

        reservations: reservationsResponse.data.length,

        reviews: reviewsResponse.data.length,
      });
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  async function fetchReservations() {
    try {
      const response = await axios.get(`${API_URL}/api/reservations`);

      setReservations(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  async function fetchReviews() {
    try {
      const response = await axios.get(`${API_URL}/api/reviews`);

      setReviews(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  async function updateReservationStatus(id, status) {
    try {
      const response = await axios.put(`${API_URL}/api/reservations/${id}`, {
        status,
      });

      const updatedReservations = reservations.map((reservation) =>
        reservation._id === id ? response.data : reservation,
      );

      setReservations(updatedReservations);

      await fetchStats();

      toast.success("Reservation updated successfully!");
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("airbnbUser");
    localStorage.removeItem("token");

    navigate("/login");
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/accommodations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setListings((prev) => prev.filter((listing) => listing._id !== id));

      await fetchStats();

      toast.success("Listing deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  }

  async function handleDeleteReservation(id) {
    if (!window.confirm("Delete this reservation?")) return;

    try {
      await axios.delete(`${API_URL}/api/reservations/${id}`);

      setReservations(reservations.filter((r) => r._id !== id));

      toast.success("Reservation deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  }

  async function handleDeleteReview(id) {
    try {
      await axios.delete(`${API_URL}/api/reviews/${id}`);

      setReviews(reviews.filter((review) => review._id !== id));

      await fetchStats();

      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  function handleEdit(listing) {
    setEditingId(listing._id);

    setTitle(listing.title);

    setLocation(listing.location);

    setImages(listing.images?.join("\n") || "");

    setPrice(listing.price);

    setType(listing.type);

    setDescription(listing.description);

    setBedrooms(listing.bedrooms);

    setBathrooms(listing.bathrooms);

    setGuests(listing.guests);

    setAmenities(listing.amenities?.join(", "));

    setWeeklyDiscount(listing.weeklyDiscount);

    setCleaningFee(listing.cleaningFee);

    setServiceFee(listing.serviceFee);

    setOccupancyTaxes(listing.occupancyTaxes);
  }

  function resetForm() {
    setEditingId(null);

    setTitle("");
    setLocation("");
    setImage("");
    setImages("");
    setPrice("");
    setType("");
    setDescription("");
    setBedrooms("");
    setBathrooms("");
    setGuests("");
    setAmenities("");
    setWeeklyDiscount("");
    setCleaningFee("");
    setServiceFee("");
    setOccupancyTaxes("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !location || !price || !type) {
      toast.warning("Please complete all required fields");
      return;
    }

    if (editingId) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
          `${API_URL}/api/accommodations/${editingId}`,
          {
            title,
            location,
            image,
            images: images
              .split("\n")
              .map((img) => img.trim())
              .filter((img) => img !== ""),
            price,
            type,
            description,
            bedrooms,
            bathrooms,
            guests,
            amenities: amenities
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== ""),
            weeklyDiscount,
            cleaningFee,
            serviceFee,
            occupancyTaxes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const updatedListings = listings.map((listing) =>
          listing._id === editingId ? response.data : listing,
        );

        setListings(updatedListings);
        toast.success("Listing updated successfully!");
        await fetchStats();
        toast.success("Listing updated successfully!");

        setEditingId(null);
      } catch (error) {
        console.error(error);

        toast.error("Unable to complete request.");
      }
    } else {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${API_URL}/api/accommodations`,
          {
            title,
            location,
            image,
            price,
            type,
            description,
            bedrooms,
            bathrooms,
            guests,
            amenities: amenities
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== ""),
            weeklyDiscount,
            cleaningFee,
            serviceFee,
            occupancyTaxes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setListings([...listings, response.data]);
        await fetchStats();
        toast.success("Listing created successfully!");
      } catch (error) {
        console.error(error);

        toast.error("Unable to complete request.");
      }
    }

    setTitle("");
    setLocation("");
    setImage("");
    setImages("");
    setPrice("");
    setType("");
    setDescription("");
    setBedrooms("");
    setBathrooms("");
    setGuests("");
    setAmenities("");
    setWeeklyDiscount("");
    setCleaningFee("");
    setServiceFee("");
    setOccupancyTaxes("");
  }

  if (loading) {
    return 
    <div className="LoadingSpinner message">Loading dashboard...</div>;
  }

  return (
    <div className="admin-page">
      <div className="page">
        <div className="admin-dashboard">
          <div className="admin-header">
            <div>
              <h1>Welcome, {user?.username}</h1>

              <p>Airbnb Admin Dashboard</p>
            </div>

            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="admin-stats-grid">
            <div className="admin-board">
              <div className="admin-stat-card">
                <h2>{stats.listings}</h2>
                <p>Listings</p>
              </div>

              <div className="admin-stat-card">
                <h2>{stats.reservations}</h2>
                <p>Reservations</p>
              </div>

              <div className="admin-stat-card">
                <h2>{stats.reviews}</h2>
                <p>Reviews</p>
              </div>

              <div className="admin-stat-card">
                <h2>R{totalRevenue.toLocaleString()}</h2>
                <p>Revenue</p>
              </div>

              <div className="admin-stat-card">
                <h2>{averageRating}</h2>
                <p>Average Rating</p>
              </div>

              <div className="analytics-grid">
                <div className="stat-card">
                  <h2>R{totalRevenue.toLocaleString()}</h2>
                  <p>Total Revenue</p>
                </div>

                <div className="stat-card">
                  <h2>{confirmedReservations.length}</h2>
                  <p>Confirmed</p>
                </div>

                <div className="stat-card">
                  <h2>{pendingReservations.length}</h2>
                  <p>Pending</p>
                </div>

                <div className="stat-card">
                  <h2>{cancelledReservations.length}</h2>
                  <p>Cancelled</p>
                </div>

                <div className="stat-card">
                  <h2>R{averageBookingValue.toLocaleString()}</h2>
                  <p>Avg Booking Value</p>
                </div>

                <div className="charts-section">
                  <div className="chart-card">
                    <h2>Revenue Overview</h2>

                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={revenueData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />

                        <Bar dataKey="amount" fill="#ff385c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-card">
                    <h2>Reservation Status</h2>

                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={reservationData}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={100}
                          label
                        >
                          <Cell fill="#22c55e" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="listing-form" onSubmit={handleSubmit}>
            <h2>{editingId ? "Edit Listing" : "Create Listing"}</h2>

            <input
              type="text"
              placeholder="Property Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {image && (
              <img src={image} alt="Preview" className="image-preview" />
            )}

            <textarea
              placeholder={`Gallery Images (one URL per line)

              https://image1.jpg
              https://image2.jpg
              https://image3.jpg
              https://image4.jpg`}
              value={images}
              onChange={(e) => setImages(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price Per Night"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="text"
              placeholder="Property Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />

            <input
              type="number"
              placeholder="Bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />

            <input
              type="number"
              placeholder="Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />

            <input
              type="text"
              placeholder="Amenities (comma separated)"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
            />

            <input
              type="number"
              placeholder="Weekly Discount"
              value={weeklyDiscount}
              onChange={(e) => setWeeklyDiscount(e.target.value)}
            />

            <input
              type="number"
              placeholder="Cleaning Fee"
              value={cleaningFee}
              onChange={(e) => setCleaningFee(e.target.value)}
            />

            <input
              type="number"
              placeholder="Service Fee"
              value={serviceFee}
              onChange={(e) => setServiceFee(e.target.value)}
            />

            <input
              type="number"
              placeholder="Occupancy Taxes"
              value={occupancyTaxes}
              onChange={(e) => setOccupancyTaxes(e.target.value)}
            />

            <button type="submit">
              {editingId ? "Update Listing" : "Create Listing"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>

          <div className="admin-listings">
            <input
              type="text"
              placeholder="Search listings..."
              value={listingSearch}
              onChange={(e) => setListingSearch(e.target.value)}
              className="search-input"
            />

            <h2>Your Listings</h2>

            <div className="admin-grid">
              {filteredListings.map((listing) => (
                <div key={listing._id} className="admin-card">
                  <img src={listing.image} alt={listing.title} />

                  <h3>{listing.title}</h3>

                  <p>
                    Location: <strong>{listing.location}</strong>
                  </p>

                  <p>
                    Type: <strong>{listing.type}</strong>
                  </p>

                  <p>
                    Bedrooms: <strong>{listing.bedrooms}</strong>
                  </p>

                  <p>
                    Bathrooms: <strong>{listing.bathrooms}</strong>
                  </p>

                  <p>
                    Guests: <strong>{listing.guests}</strong>
                  </p>

                  <p>
                    Description: <strong>{listing.description}</strong>
                  </p>

                  <p>
                    Amenities: <strong>{listing.amenities?.join(", ")}</strong>
                  </p>

                  <p>
                    Discount: <strong>{listing.weeklyDiscount}%</strong>
                  </p>

                  <p>
                    Price: <strong>R{listing.price.toLocaleString()}</strong>
                  </p>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(listing)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(listing._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="admin-reservations">
            <input
              type="text"
              placeholder="Search reservations..."
              value={reservationSearch}
              onChange={(e) => setReservationSearch(e.target.value)}
              className="search-input"
            />

            <h2>Reservations</h2>

            <table className="reservations-table">
              <thead>
                <tr className="reservations-table-header">
                  <th>Guest</th>
                  <th>Property</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>{reservation.username}</td>
                    <td>{reservation.title}</td>

                    <td>
                      {new Date(reservation.checkIn).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(reservation.checkOut).toLocaleDateString()}
                    </td>

                    <td>R{reservation.total.toLocaleString()}</td>

                    <td>
                      <span
                        className={`status-badge ${reservation.status?.toLowerCase()}`}
                      >
                        {reservation.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="status-badge-select-status"
                        value={reservation.status}
                        onChange={(e) =>
                          updateReservationStatus(
                            reservation._id,
                            e.target.value,
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="status-badge-delete-btn"
                        onClick={() => handleDeleteReservation(reservation._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="revenue-summary">
              <h2>Revenue Summary</h2>

              <p>
                Total Revenue:
                <strong> R{totalRevenue.toLocaleString()}</strong>
              </p>

              <p>
                Confirmed Bookings:
                <strong> {confirmedReservations.length}</strong>
              </p>

              <p>
                Average Booking:
                <strong> R{averageBookingValue.toLocaleString()}</strong>
              </p>
            </div>

            <div className="admin-reviews">
              <input
                type="text"
                placeholder="Search reviews..."
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
                className="search-input"
              />

              <h2>Reviews</h2>

              <table className="reviews-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Property</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review._id}>
                      <td>{review.username}</td>

                      <td>{review.accommodationTitle}</td>

                      <td>⭐ {review.rating}</td>

                      <td>{review.comment}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
