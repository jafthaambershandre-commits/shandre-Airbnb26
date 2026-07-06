export default function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <section className="search-wrapper">

      <div className="search-bar">

        <div className="search-item">
          <h4>Where</h4>

          <input
            type="text"
            placeholder="Search destinations"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="divider"></div>

        <div className="search-item">
          <h4>Check in</h4>

          <p>Add dates</p>
        </div>

        <div className="divider"></div>

        <div className="search-item">
          <h4>Check out</h4>

          <p>Add dates</p>
        </div>

        <div className="divider"></div>

        <div className="search-item">
          <h4>Who</h4>

          <p>Add guests</p>
        </div>

        <button className="search-btn">
          🔍
        </button>

      </div>

    </section>
  );
}