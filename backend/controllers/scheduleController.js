import Schedule from "../models/scheduleModel.js";
import Booking from "../models/bookingModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Create a new schedule
// @route   POST /api/schedules
const createSchedule = asyncHandler(async (req, res) => {
  const {
    startLocation,
    startTime,
    endLocation,
    endTime,
    price,
    date,
    status,
  } = req.body;

  const schedule = new Schedule({
    bus: req.bus._id,
    startLocation,
    startTime,
    endLocation,
    endTime,
    price,
    date,
    status,
  });

  const createdSchedule = await schedule.save();
  res.status(201).json(createdSchedule);
});

// @desc    Get all schedules
// @route   GET /api/schedules
const getAllSchedules = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find().populate({
    path: "bus",
    select: "busNumber busName from to amenities",
  });

  if (schedules.length > 0) {
    res.status(200).json(schedules);
  } else {
    res.status(404).json({ message: "No schedules found" });
  }
});

// @desc    Get all schedules for a specific bus
// @route   GET /api/schedules/bus/:busId
const getAllSchedulesByBus = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find({ bus: req.bus._id })
    .populate("bus", "busNumber from to")
    .sort({ date: -1 });

  if (schedules.length > 0) {
    res.status(200).json(schedules);
  } else {
    res
      .status(404)
      .json({ message: "No schedules found for the specified bus" });
  }
});

// @desc    Get a schedule by ID
// @route   GET /api/schedules/:id
const getScheduleById = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id).populate({
    path: "bus",
    select: "busNumber busName from to amenities routeNumber estimatedTime phoneNumber",
  });

  if (schedule) {
    res.status(200).json(schedule);
  } else {
    res.status(404).json({ message: "Schedule not found" });
  }
});



// @desc    Update a schedule
// @route   PUT /api/schedules/:id
const updateSchedule = asyncHandler(async (req, res) => {
  const {
    startLocation,
    startTime,
    endLocation,
    endTime,
    date,
    price,
    status,
  } = req.body;

  const schedule = await Schedule.findById(req.params.id);

  if (schedule) {
    schedule.startLocation = startLocation || schedule.startLocation;
    schedule.startTime = startTime || schedule.startTime;
    schedule.endLocation = endLocation || schedule.endLocation;
    schedule.endTime = endTime || schedule.endTime;
    schedule.price = price || schedule.price;
    schedule.date = date || schedule.date;
    schedule.status = status || schedule.status;

    const updatedSchedule = await schedule.save();
    res.status(200).json(updatedSchedule);
  } else {
    res.status(404).json({ message: "Schedule not found" });
  }
});

// @desc    Delete a schedule
// @route   DELETE /api/schedules/:id
const deleteSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (schedule) {
    await schedule.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Schedule removed" });
  } else {
    res.status(404).json({ message: "Schedule not found" });
  }
});

// @desc    Get schedules by startLocation and endLocation
// @route   GET /api/schedules/location
const getSchedulesByLocation = asyncHandler(async (req, res) => {
  console.log(`req.body => `, req.body);
  const { startLocation, endLocation } = req.body;

  const schedules = await Schedule.find({
    startLocation: startLocation,
    endLocation: endLocation,
  }).populate({
    path: "bus",
    select: "busNumber from to amenities",
  });

  if (schedules.length > 0) {
    res.status(200).json(schedules);
  } else {
    res
      .status(404)
      .json({ message: "No schedules found for the selected locations" });
  }
});

const getScheduleSeatsById = asyncHandler(async (req, res) => {
  const { id, date } = req.params;
  const seats = await getAllSeats(30, id, date);
  if (seats) {
    res.status(200).json(seats);
  } else {
    res.status(404).json({ message: "Schedule not found" });
  }
});

async function getAllSeats(totalSeats = 30, scheduleId, date) {
  const bookedSeats = await Booking.find({
    schedule: scheduleId,
    bookedDate: {
      $gte: new Date(date),
      $lt: new Date(date).setDate(new Date(date).getDate() + 1),
    },
  });
  const seats = [];
  for (let i = 1; i <= totalSeats; i++) {
    const seatNumber = `${i}A`;
    const booking = bookedSeats.find(
      (booking) => booking.seatNumber === seatNumber
    );
    seats.push({
      seatNumber: seatNumber,
      isBooked: !!booking,
      gender: booking ? booking.gender : null,
    });
  }
  return seats;
}

export {
  createSchedule,
  getAllSchedules,
  getAllSchedulesByBus,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getSchedulesByLocation,
  getScheduleSeatsById,
};
