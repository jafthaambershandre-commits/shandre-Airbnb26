import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReservationCard from "../components/ReservationCard";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import API_URL from "../utils/api";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/reservations/my`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function cancelReservation(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchReservations();

      toast.success("Reservation cancelled.");
    } catch(error){
   console.error(error);

   toast.error("Unable to complete request.");
}
  }

  return (
    <div>
      <Navbar />

      <div className="page">

      <div className="reservations-page">
        <h1>Your Reservations</h1>

        {reservations.length === 0 ? (
          <div className="empty-state">
            <h2>📅 No Reservations Yet</h2>

            <p>Book your first stay to see it here.</p>
          </div>
        ) : (
          <div className="reservations-grid">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation._id}
                reservation={reservation}
                cancelReservation={cancelReservation}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
    </div>
  );
}
