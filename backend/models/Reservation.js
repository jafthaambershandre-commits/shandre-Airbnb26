import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  title: String,
  location: String,
  image: String,
  price: Number,
  guests: Number,
  checkIn: String,
  checkOut: String,
  total: Number,
  username: String,

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
});

export default mongoose.model(
  "Reservation",
  reservationSchema
);