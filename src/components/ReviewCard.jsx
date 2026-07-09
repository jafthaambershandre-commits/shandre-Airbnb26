export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-rating">
        ⭐ {Number(review.rating).toFixed(1)}
      </div>

      <p className="review-comment">
        "{review.comment}"
      </p>

      <div className="review-user">
        👤 {review.username}
      </div>
    </div>
  );
}