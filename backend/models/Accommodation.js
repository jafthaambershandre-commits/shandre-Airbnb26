import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
    default: [],
  },

  price: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  bedrooms: {
    type: Number,
    required: true,
  },

  bathrooms: {
    type: Number,
    required: true,
  },

  guests: {
    type: Number,
    required: true,
  },

  amenities: {
    type: [String],
    default: [],
  },

  weeklyDiscount: {
    type: Number,
    default: 0,
  },

  cleaningFee: {
    type: Number,
    default: 0,
  },

  serviceFee: {
    type: Number,
    default: 0,
  },

  occupancyTaxes: {
    type: Number,
    default: 0,
  },

  host: {
    type: String,
    default: "",
  },

  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  rating: {
    type: Number,
    default: 0,
  },
});

const Accommodation = mongoose.model(
  "Accommodation",
  accommodationSchema
);

export default Accommodation;