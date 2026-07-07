export default function SortFilter({ sortBy, setSortBy }) {
  return (
    <div className="sort-filter">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="Default">Sort by</option>

        <option value="PriceLow">Price: Low to High</option>

        <option value="PriceHigh">Price: High to Low</option>

        <option value="Rating">Highest Rated</option>
      </select>
    </div>
  );
}
