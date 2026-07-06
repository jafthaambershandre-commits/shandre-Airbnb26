export default function ReviewCard({
  review,
}) {
  return (
    <div className="review-card">

      <h4>
        ⭐ {review.rating}
      </h4>

      <p>
        {review.comment}
      </p>

      <small>
        - {review.username}
      </small>

    </div>
  );
}