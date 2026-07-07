import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import axios from "axios";
import API_URL from "../utils/api";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await axios.get(`${API_URL}/api/accommodations`);

        console.log("API RESPONSE:", res.data);

        setListings(res.data);
      } catch (error) {
        console.error(error);

        toast.error("Unable to complete request.");
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <LoadingSpinner message="Loading listings..." />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="page">
        <div className="listings-page">
          <h1>Available Stays</h1>

          <div className="listings-grid">
            {listings.map((listing) => (
              <ListingCard
                key={listing._id}
                id={listing._id}
                image={listing.image}
                title={listing.title}
                location={listing.location}
                price={listing.price}
                rating={listing.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
