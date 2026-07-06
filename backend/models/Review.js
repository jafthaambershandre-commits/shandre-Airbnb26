import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
  },

  accommodationTitle: String,

  username: String,

  rating: Number,

  comment: String,
});

export default mongoose.model("Review", reviewSchema);
