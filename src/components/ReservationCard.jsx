import { useNavigate } from "react-router-dom";

export default function ReservationCard({
  reservation,
  cancelReservation,
}) {
  const navigate = useNavigate();

  const nights =
    Math.ceil(
      (new Date(reservation.checkOut) -
        new Date(reservation.checkIn)) /
        (1000 * 60 * 60 * 24)
    );

  return (
    <div className="reservation-card">

      <img
        src={reservation.image}
        alt={reservation.title}
      />

      <div className="reservation-content">

        <h2>{reservation.title}</h2>

        <p className="reservation-location">
          📍 {reservation.location}
        </p>

        <div className="reservation-info">

          <p>
            📅
            {new Date(
              reservation.checkIn
            ).toLocaleDateString()}
            {" "}-
            {" "}
            {new Date(
              reservation.checkOut
            ).toLocaleDateString()}
          </p>

          <p>
            🌙 {nights} night{nights > 1 ? "s" : ""}
          </p>

          <p>
            👥 {reservation.guests} Guest
            {reservation.guests > 1 ? "s" : ""}
          </p>

        </div>

        <h3>
          R{reservation.total.toLocaleString()}
        </h3>

        <span
          className={`status-badge ${(
            reservation.status || "Confirmed"
          ).toLowerCase()}`}
        >
          {reservation.status || "Confirmed"}
        </span>

        <div className="reservation-actions">

          <button
            className="view-btn"
            onClick={() =>
              navigate(`/listing/${reservation.listingId}`)
            }
          >
            View Listing
          </button>

          <button
            className="cancel-btn"
            onClick={() =>
              cancelReservation(reservation._id)
            }
          >
            Cancel Reservation
          </button>

        </div>

      </div>

    </div>
  );
}