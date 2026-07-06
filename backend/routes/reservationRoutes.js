import express from "express";
import Reservation from "../models/Reservation.js";
import {
  createReservation,
  getReservations,
  getMyReservations,
  deleteReservation,
} from "../controllers/reservationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createReservation);

router.get(
  "/",
  getReservations
);

router.get(
  "/my",
  auth,
  getMyReservations
);

router.put("/:id", auth, async (req, res) => {
  try {
    const reservation =
      await Reservation.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );

    res.json(reservation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete(
  "/:id",
  deleteReservation
);

export default router;