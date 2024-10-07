import Schedule from "../models/scheduleModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Create a new schedule
// @route   POST /api/schedules
const createSchedule = asyncHandler(async (req, res) => {
  const { bus, startLocation, startTime, endLocation, endTime, price } =
    req.body;

  const schedule = new Schedule({
    bus,
    startLocation,
    startTime,
    endLocation,
    endTime,
    price,
  });

  const createdSchedule = await schedule.save();
  res.status(201).json(createdSchedule);
});

// @desc    Get all schedules for a specific bus
// @route   GET /api/schedules/bus/:busId
const getAllSchedulesByBus = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find({ bus: req.params.id })
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
  const schedule = await Schedule.findById(req.params.id).populate(
    "bus",
    "busNumber from to"
  );

  if (schedule) {
    res.status(200).json(schedule);
  } else {
    res.status(404).json({ message: "Schedule not found" });
  }
});

// @desc    Update a schedule
// @route   PUT /api/schedules/:id
const updateSchedule = asyncHandler(async (req, res) => {
  const { startLocation, startTime, endLocation, endTime, date, price } =
    req.body;

  const schedule = await Schedule.findById(req.params.id);

  if (schedule) {
    schedule.startLocation = startLocation || schedule.startLocation;
    schedule.startTime = startTime || schedule.startTime;
    schedule.endLocation = endLocation || schedule.endLocation;
    schedule.endTime = endTime || schedule.endTime;
    schedule.price = price || schedule.price;

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
  }).populate("bus", "busNumber from to");

  if (schedules.length > 0) {
    res.status(200).json(schedules);
  } else {
    res
      .status(404)
      .json({ message: "No schedules found for the selected locations" });
  }
});

export {
  createSchedule,
  getAllSchedulesByBus,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getSchedulesByLocation,
};
