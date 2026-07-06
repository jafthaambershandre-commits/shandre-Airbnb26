export default function FeaturedDestinations() {
  const places = [
    {
      city: "Cape Town",
      image:
        "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
    },
    {
      city: "Durban",
      image:
        "https://images.unsplash.com/photo-1576485375217-d6a95e34d043",
    },
    {
      city: "Johannesburg",
      image:
        "https://images.unsplash.com/photo-1597212618440-806262de4f6b",
    },
    {
      city: "Drakensberg",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  ];

  return (
    <section className="featured-destinations">

      <h2>Explore South Africa</h2>

      <div className="featured-grid">

        {places.map((place) => (

          <div
            key={place.city}
            className="featured-card"
          >
            <img
              src={place.image}
              alt={place.city}
            />

            <h3>{place.city}</h3>

          </div>

        ))}

      </div>

    </section>
  );
}