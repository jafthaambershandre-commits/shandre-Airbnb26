export default function StatsSection() {
  const stats = [
    {
      number: "300+",
      title: "Properties",
      icon: "🏠",
    },
    {
      number: "12K+",
      title: "Happy Guests",
      icon: "😊",
    },
    {
      number: "4.9",
      title: "Average Rating",
      icon: "⭐",
    },
    {
      number: "20+",
      title: "Destinations",
      icon: "🌍",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-box" key={stat.title}>
            <div className="stat-icon">{stat.icon}</div>

            <h2>{stat.number}</h2>

            <p>{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}