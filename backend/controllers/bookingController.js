import Booking from "../models/bookingModel.js";
import Bus from "../models/busModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Schedule from "../models/scheduleModel.js";

// @desc    Create a new booking
// @route   POST /api/bookings
const createBooking = asyncHandler(async (req, res) => {
  const { user, schedule, seatNumber, gender, bookedDate } = req.body;

  // Check if the bus exists
  // console.log(`schedule.bus => `, schedule);
  const busExists = await Schedule.findById(schedule);
  if (!busExists) {
    res.status(404).json({ message: "Bus not found" });
    return;
  }
  // console.log(`busExists => `, busExists);

  // Check if the seat is already booked
  const existingBooking = await Booking.findOne({ seatNumber, bookedDate });
  console.log(`existingBooking => `, existingBooking);
  if (existingBooking) {
    res.status(400).json({ message: "Seat already booked" });
    return;
  }

  const booking = new Booking({
    user,
    schedule,
    seatNumber,
    gender,
    bookedDate,
    amount: busExists.price,
    isPaid: true, // Default to unpaid
    status: "Pending", // Default to Pending status
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// @desc    Get all bookings
// @route   GET /api/bookings
const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: "schedule",
      select: "bus startLocation startTime endLocation endTime _id", // Include _id to return the schedule ID
    })
    .populate({
      path: "user",
      select: "name email",
    });

  if (bookings.length > 0) {
    res.status(200).json(bookings);
  } else {
    res.status(404).json({ message: "No bookings found" });
  }
});

// @desc    Get all bookings for a user
// @route   GET /api/bookings/user/:userId
const getBookingsByUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.params.id })
    .populate({
      path: "schedule",
      select:
        "startLocation startTime endLocation endTime price date status bus",
      populate: {
        path: "bus",
        select: "busNumber busName",
      },
    })
    .populate("user", "name email");
  if (bookings.length > 0) {
    res.status(200).json(bookings);
  } else {
    res.status(404).json({ message: "No bookings found for this user" });
  }
});

// @desc    Get all bookings for a bus
// @route   GET /api/bookings/bus/:busId
const getBookingsByBus = asyncHandler(async (req, res) => {
  try {
    const schedules = await Schedule.find({ bus: req.bus._id })
      .populate("bus", "busNumber from to")
      .sort({ date: -1 });

    if (schedules.length > 0) {
      const scheduleIds = schedules.map((schedule) => schedule._id);

      // Find all bookings related to these schedule IDs
      const bookings = await Booking.find({
        schedule: { $in: scheduleIds },
      }).populate("user", "name contact");

      // Just return the bookings array
      res.status(200).json(bookings); // Now the response is an array of bookings
    } else {
      res
        .status(404)
        .json({ message: "No schedules found for the specified bus" });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      message: "An error occurred while fetching bookings",
      error: error.message,
    });
  }
});

// @desc    Get a single booking by ID
// @route   GET /api/bookings/:id
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("schedule", "bus startLocation startTime endLocation endTime")
    .populate("user", "name email contact");

  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

// @desc    Update booking status (e.g., Confirm or Cancel booking)
// @route   PUT /api/bookings/:id/status
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // Should be "Confirmed" or "Cancelled"

  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.status = status || booking.status;

    const updatedBooking = await booking.save();
    res.status(200).json(updatedBooking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

// @desc    Mark a booking as paid
// @route   PUT /api/bookings/:id/pay
const payForBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.isPaid = true;

    const paidBooking = await booking.save();
    res.status(200).json(paidBooking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    await booking.deleteOne({ _id: booking._id });
    res.status(200).json({ message: "Booking removed" });
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

export {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  getBookingsByBus,
  getBookingById,
  updateBookingStatus,
  payForBooking,
  deleteBooking,
};
