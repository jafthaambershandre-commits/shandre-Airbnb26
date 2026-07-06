import express from "express";
import {
  createAccommodation,
  getAccommodations,
  deleteAccommodation,
  getAccommodationById,
  updateAccommodation,
} from "../controllers/accommodationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createAccommodation);

router.get("/", getAccommodations);

router.get("/:id", getAccommodationById);

router.delete("/:id", auth, deleteAccommodation);

router.put("/:id", auth, updateAccommodation);

export default router;
