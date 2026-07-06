export default function PriceFilter({
  priceFilter,
  setPriceFilter,
}) {
  return (
    <div className="price-filter">

      <select
        value={priceFilter}
        onChange={(e) =>
          setPriceFilter(
            e.target.value
          )
        }
      >
        <option value="All">
          All Prices
        </option>

        <option value="Under1000">
          Under R1000
        </option>

        <option value="1000to3000">
          R1000 - R3000
        </option>

        <option value="Above3000">
          Above R3000
        </option>

      </select>

    </div>
  );
}