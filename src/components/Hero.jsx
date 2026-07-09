export default function Hero() {

  function scrollToListings() {
    const section = document.getElementById("popular-homes");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <section className="hero">

      <div className="hero-overlay">

        <h1>
          Find your perfect escape
        </h1>

        <p>
          Discover cabins, villas, apartments,
          beachfront escapes and unforgettable
          experiences across South Africa.
        </p>

        <button onClick={scrollToListings}>
          Explore Homes
        </button>

      </div>

    </section>
  );
}