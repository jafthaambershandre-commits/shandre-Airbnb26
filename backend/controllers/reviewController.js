import Review from "../models/Review.js";
import Accommodation
from "../models/Accommodation.js";

export async function createReview(
  req,
  res
) {
  try {

    const review =
      await Review.create(
        req.body
      );

    const reviews =
      await Review.find({
        accommodationId:
          req.body.accommodationId,
      });

    const totalRating =
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      );

    const averageRating =
      totalRating /
      reviews.length;

    await Accommodation.findByIdAndUpdate(

      req.body.accommodationId,

      {
        rating:
          averageRating,
      }

    );

    res.status(201).json(
      review
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
}

export async function getReviews(
  req,
  res,
) {
  try {
    const reviews =
      await Review.find({
        accommodationId:
          req.params.id,
      });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getAllReviews(
  req,
  res
) {
  try {

    const reviews =
      await Review.find();

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
}

export async function deleteReview(req, res) {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}