import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import API_URL from "../utils/api";

export default function Location() {
  const { city } = useParams();

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const response = await axios.get(
       `${API_URL}/api/accommodations`,
      );

      setListings(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  const filteredListings = listings.filter((listing) =>
    listing.location.toLowerCase().includes(city.toLowerCase()),
  );

  return (
    <div>
      <Navbar />

      <div className="page">
        <div className="location-page">
          <h1>
            {filteredListings.length} stays in {city}
          </h1>

          <div className="listings-grid">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing._id}
                id={listing._id}
                image={listing.image}
                title={listing.title}
                location={listing.location}
                price={listing.price}
                rating={
                  listing.rating > 0
                    ? `⭐ ${listing.rating.toFixed(1)}`
                    : "No reviews yet"
                }
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
