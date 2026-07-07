export default function FeaturedDestinations() {
  const places = [
    {
      city: "Cape Town",
      subtitle: "Table Mountain & Beaches",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    },
    {
      city: "Stellenbosch",
      subtitle: "Wine Country",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      city: "Garden Route",
      subtitle: "Forests & Coastline",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    },
    {
      city: "Kruger National Park",
      subtitle: "Big Five Safari",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615",
    },
  ];

  return (
    <section className="featured-destinations">
      <h2>Explore South Africa</h2>

      <p>Discover incredible destinations and unforgettable experiences.</p>

      <div className="featured-grid">
        {places.map((place) => (
          <div key={place.city} className="featured-card">
            <img src={place.image} alt={place.city} />

            <div className="featured-info">
              <h3>{place.city}</h3>
              <p>{place.subtitle}</p>

              <span className="explore-link">Explore →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
