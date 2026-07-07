export default function TypeFilter({
  typeFilter,
  setTypeFilter,
}) {
  return (
    <div className="type-filter">

      <select
        value={typeFilter}
        onChange={(e) =>
          setTypeFilter(
            e.target.value
          )
        }
      >
        <option value="All">
          Property Type
        </option>

        <option value="Apartment">
          Apartment
        </option>

        <option value="House">
          House
        </option>

        <option value="Villa">
          Villa
        </option>

        <option value="Cabin">
          Cabin
        </option>

      </select>

    </div>
  );
}