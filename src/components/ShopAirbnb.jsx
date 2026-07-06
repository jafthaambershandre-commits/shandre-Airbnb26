import { useNavigate } from "react-router-dom";

export default function ShopAirbnb() {
  const navigate = useNavigate();

  return (
    <section className="shop-airbnb">

      <h2>Shop Airbnb</h2>

      <div className="shop-grid">

        <div
          className="shop-card"
          onClick={() => navigate("/listings")}
        >
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            alt="Homes"
          />

          <h3>Entire Homes</h3>

          <p>Comfortable places all to yourself.</p>

        </div>

        <div
          className="shop-card"
          onClick={() => navigate("/listings")}
        >
          <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
            alt="Unique Stays"
          />

          <h3>Unique Stays</h3>

          <p>Cabins, villas and amazing homes.</p>

        </div>

        <div
          className="shop-card"
          onClick={() => navigate("/listings")}
        >
          <img
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60"
            alt="Experiences"
          />

          <h3>Experiences</h3>

          <p>Discover unforgettable adventures.</p>

        </div>

      </div>

    </section>
  );
}