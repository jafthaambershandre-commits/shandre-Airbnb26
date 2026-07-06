import express from "express";
import {
  createReview,
  getReviews,
  getAllReviews,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);

router.get("/", getAllReviews);

router.get("/:id", getReviews);

router.delete("/:id", deleteReview);

export default router;
