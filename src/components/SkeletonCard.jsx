export default function SkeletonCard() {
  return (
    <div className="listing-card skeleton-card">
      <div className="skeleton-image"></div>

      <div className="listing-info">
        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-location"></div>

        <div className="skeleton skeleton-price"></div>
      </div>
    </div>
  );
}