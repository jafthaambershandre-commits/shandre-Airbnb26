export default function StayAnywhere({ setSearchTerm }) {
  const destinations = [
    {
      name: "Beachfront Villas",
      location: "Cape Town",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    },
    {
      name: "Luxury Apartments",
      location: "Johannesburg",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    {
      name: "Mountain Cabins",
      location: "Drakensberg",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    },
    {
      name: "Safari Lodges",
      location: "Kruger National Park",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    },
  ];

  return (
    <section className="stay-anywhere">
      <h2>Stay anywhere in South Africa</h2>

      <p>Unique homes, cabins, villas and luxury stays.</p>

      <div className="stay-grid">
        {destinations.map((place) => (
          <div
            key={place.name}
            className="stay-card"
            onClick={() => setSearchTerm(place.name)}
          >
            <img src={place.image} alt={place.name} />

            <div className="stay-overlay">
              <h3>{place.name}</h3>

              <p>{place.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
