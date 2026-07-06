import Accommodation from "../models/Accommodation.js";

export async function createAccommodation(
  req,
  res
) {
  try {
    const accommodation =
      await Accommodation.create(
        req.body
      );

    res.status(201).json(
      accommodation
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getAccommodationById(
  req,
  res
) {
  try {
    const accommodation =
      await Accommodation.findById(
        req.params.id
      );

    res.json(accommodation);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getAccommodations(req, res) {
  try {
    const accommodations = await Accommodation.find();

    res.json(accommodations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteAccommodation(
  req,
  res
) {
  try {
    await Accommodation.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Accommodation deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateAccommodation(
  req,
  res
) {
  try {

    const accommodation =
      await Accommodation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(accommodation);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
}