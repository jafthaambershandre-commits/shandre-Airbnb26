import Reservation from "../models/Reservation.js";

export async function createReservation(req, res) {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getReservations(
  req,
  res
) {
  try {
    const reservations =
      await Reservation.find();

    res.json(reservations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getMyReservations(
  req,
  res
) {
  try {

    const reservations =
      await Reservation.find({
        userId:
          req.user.id,
      });

    res.json(reservations);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
}

export async function deleteReservation(
  req,
  res
) {
  try {
    await Reservation.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Reservation deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}