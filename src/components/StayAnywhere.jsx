export default function StayAnywhere({ setSearchTerm }) {
  const destinations = [
    {
      name: "Cape Town",
      image:
        "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
    },
    {
      name: "Durban",
      image:
        "https://images.unsplash.com/photo-1576485375217-d6a95e34d043",
    },
    {
      name: "Johannesburg",
      image:
        "https://images.unsplash.com/photo-1597212618440-806262de4f6b",
    },
    {
      name: "Drakensberg",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  ];

  return (
    <section className="stay-anywhere">

      <h2>Stay Anywhere</h2>

      <p>Explore beautiful destinations across South Africa</p>

      <div className="stay-grid">

        {destinations.map((place) => (

          <div
            key={place.name}
            className="stay-card"
            onClick={() => setSearchTerm(place.name)}
          >

            <img
              src={place.image}
              alt={place.name}
            />

            <div className="stay-overlay">

              <h3>{place.name}</h3>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}