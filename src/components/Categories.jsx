export default function Categories() {
  const categories = [
    { icon: "🏖️", name: "Beach" },
    { icon: "🏡", name: "Cabins" },
    { icon: "🌳", name: "Countryside" },
    { icon: "🏔️", name: "Amazing Views" },
    { icon: "🏕️", name: "Camping" },
    { icon: "🏝️", name: "Islands" },
    { icon: "🏠", name: "Tiny Homes" },
    { icon: "🌊", name: "Lakefront" },
  ];

  return (
    <section className="categories">

      {categories.map((category) => (

        <div
          key={category.name}
          className="category-card"
        >
          <span>{category.icon}</span>

          <p>{category.name}</p>

        </div>

      ))}

    </section>
  );
}