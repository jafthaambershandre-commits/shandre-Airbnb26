import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StayAnywhere from "../components/StayAnywhere";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import FeaturedDestinations from "../components/FeaturedDestinations";
import StatsSection from "../components/StatsSection";
import ShopAirbnb from "../components/ShopAirbnb";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import TypeFilter from "../components/TypeFilter";
import PriceFilter from "../components/PriceFilter";
import SortFilter from "../components/SortFilter";
import ReviewCard from "../components/ReviewCard";
import SkeletonCard from "../components/SkeletonCard";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import API_URL from "../utils/api";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [typeFilter, setTypeFilter] = useState(
    searchParams.get("type") || "All",
  );
  const [priceFilter, setPriceFilter] = useState(
    searchParams.get("price") || "All",
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "Default");
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentListings, setRecentListings] = useState([]);
  const filteredListings = listings.filter((listing) => {
    const matchesLocation = listing.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "All" ? true : listing.type === typeFilter;

    const matchesCategory =
      selectedCategory === "All"
        ? true
        : listing.type.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          listing.title
            .toLowerCase()
            .includes(selectedCategory.toLowerCase()) ||
          listing.location
            .toLowerCase()
            .includes(selectedCategory.toLowerCase());

    let matchesPrice = true;

    if (priceFilter === "Under1000") {
      matchesPrice = listing.price < 1000;
    }

    if (priceFilter === "1000to3000") {
      matchesPrice = listing.price >= 1000 && listing.price <= 3000;
    }

    if (priceFilter === "Above3000") {
      matchesPrice = listing.price > 3000;
    }

    return matchesLocation && matchesType && matchesPrice && matchesCategory;
  });

  const sortedListings = [...filteredListings];

  if (sortBy === "PriceLow") {
    sortedListings.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "PriceHigh") {
    sortedListings.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "Rating") {
    sortedListings.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  useEffect(() => {
    fetchListings();
    fetchRecentReviews();

    const recent = JSON.parse(localStorage.getItem("recentListings")) || [];

    setRecentListings(recent);
  }, []);

  useEffect(() => {
    const params = {};

    if (searchTerm) params.search = searchTerm;
    if (typeFilter !== "All") params.type = typeFilter;
    if (priceFilter !== "All") params.price = priceFilter;
    if (sortBy !== "Default") params.sort = sortBy;

    setSearchParams(params);
  }, [searchTerm, typeFilter, priceFilter, sortBy]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="listings-grid">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <Footer />
      </div>
    );
  }

  function clearFilters() {
    setSearchTerm("");
    setTypeFilter("All");
    setPriceFilter("All");

    localStorage.removeItem("airbnbFilters");
  }

  async function fetchListings() {
    try {
      const response = await axios.get(`${API_URL}/api/accommodations`);
      setListings(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchRecentReviews() {
    try {
      const response = await axios.get(`${API_URL}/api/reviews`);

      setRecentReviews(response.data.slice(0, 5));
    } catch (error) {
      console.error(error);

      toast.error("Unable to complete request.");
    }
  }

  return (
    <div>
      <Navbar />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Hero />

      <StayAnywhere setSearchTerm={setSearchTerm} />

      <FeaturedDestinations />

      <ShopAirbnb />

      <StatsSection />

      <div className="filters">
        <TypeFilter typeFilter={typeFilter} setTypeFilter={setTypeFilter} />

        <PriceFilter
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />

        <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <button className="clear-filters-btn" onClick={clearFilters}>
        Reset Filters
      </button>

      <div className="listings-section" id="popular-homes">
        <h2>Popular homes in South Africa ({filteredListings.length})</h2>

        {filteredListings.length === 0 && (
          <div className="empty-state">
            <p>
              🏡 No stays matched your search. Try changing your dates, location
              or filters.
            </p>
          </div>
        )}

        <div className="listings-grid">
          {sortedListings.map((listing) => (
            <ListingCard
              key={listing._id}
              id={listing._id}
              image={listing.image}
              title={listing.title}
              location={listing.location}
              price={listing.price}
              rating={listing.rating || 0}
              type={listing.type}
            />
          ))}
        </div>
      </div>

      {recentListings.length > 0 && (
        <div className="recently-viewed">
          <h2>Continue exploring</h2>
          <p>Based on your recently viewed listings</p>

          <div className="listings-grid">
            {recentListings.map((listing) => (
              <ListingCard
                key={listing._id}
                id={listing._id}
                image={listing.image}
                title={listing.title}
                location={listing.location}
                price={listing.price}
                rating={listing.rating || 0}
              />
            ))}
          </div>
        </div>
      )}

      <div className="guest-favorites">
        <h2>⭐ Guest Favorites</h2>

        <p>Discover the highest-rated stays loved by our guests.</p>

        <div className="listings-grid">
          {listings
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 4)
            .map((listing) => (
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

      <div className="recent-reviews">
        <h2>What guests are saying</h2>

        <div className="reviews-grid">
          {recentReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
