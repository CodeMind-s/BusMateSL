import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  getBookingsByBus,
  getBookingById,
  updateBookingStatus,
  payForBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// @desc    Create a new booking
router.route("/").post(createBooking).get(getAllBookings);

// @desc    Get all bookings by user
router.route("/mybookings").get(authenticate, getBookingsByUser);

// @desc    Get all bookings by bus
router.route("/bus").get(getBookingsByBus);

// @desc    Get a single booking by ID, Delete a booking
router.route("/:id").get(getBookingById).delete(deleteBooking);

// @desc    Update booking status (e.g., Confirm or Cancel booking)
router.route("/:id/status").put(updateBookingStatus);

// @desc    Pay for a booking
router.route("/:id/pay").put(payForBooking);

export default router;
