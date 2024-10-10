import Bus from "../models/busModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { generateBusToken } from "../utils/createToken.js";
import bcrypt from "bcryptjs";

// @desc    Get all buses
// @route   GET /api/buses
const getAllBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find({});
  res.status(200).json(buses);
});

// @desc    Get a single bus by ID
// @route   GET /api/buses/:id
const getBusById = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);
  if (bus) {
    res.status(200).json(bus);
  } else {
    res.status(404).json({ message: "Bus not found" });
  }
});

// @desc    Create a new bus
// @route   POST /api/buses
const createBus = asyncHandler(async (req, res) => {
  const {
    driverNumber,
    conductorNumber,
    busNumber,
    busName,
    routeNumber,
    estimatedTime,
    type,
    from,
    to,
    email,
    phoneNumber,
    seatCount,
    password,
    amenities,
  } = req.body;

  const busExists = await Bus.findOne({ busNumber });
  if (busExists) {
    res.status(400).json({ message: "Bus already exists" });
    return;
  }

  // Encrypting the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const bus = new Bus({
    driverNumber,
    conductorNumber,
    busNumber,
    busName,
    routeNumber,
    estimatedTime,
    type,
    from,
    to,
    email,
    phoneNumber,
    seatCount,
    password: hashedPassword,
    amenities,
  });

  try {
    const createdBus = await bus.save();
    generateBusToken(res, createdBus._id);
    res.status(201).json(createdBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Authenticate bus and get token
// @route   POST /api/buses/login
const authBus = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const bus = await Bus.findOne({ email });
  //   console.log(`bus => `, bus);

  if (bus && (await bcrypt.compare(password, bus.password))) {
    generateBusToken(res, bus._id);
    res.status(200).json(bus);
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// @desc    Get current logged-in bus
// @route   GET /api/buses/profile
const getCurrentBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.bus._id);

  if (bus) {
    res.status(200).json(bus);
  } else {
    res.status(404).json({ message: "Bus not found" });
  }
});

// @desc    Update bus details
// @route   PUT /api/buses/:id
const updateBusById = asyncHandler(async (req, res) => {
  const { type, from, to, phoneNumber, seatCount, password, amenities, busName, routeNumber, estimatedTime} =
    req.body;

  const bus = await Bus.findById(req.bus.id);

  if (bus) {
    // Proceed with updating the bus
    bus.type = type || bus.type;
    bus.from = from || bus.from;
    bus.to = to || bus.to;
    bus.busName = busName || bus.busName;
    bus.routeNumber = routeNumber || bus.routeNumber;
    bus.estimatedTime = estimatedTime || bus.estimatedTime;
    bus.phoneNumber = phoneNumber || bus.phoneNumber;
    bus.seatCount = seatCount || bus.seatCount;
    bus.password = password || bus.password;
    bus.amenities = amenities || bus.amenities;

    let passwordChanged = false;

    if (req.body.password) {
      // Encrypting the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      bus.password = hashedPassword;
      passwordChanged = true;
    }

    const updatedBus = await bus.save();
    const responseMessage = passwordChanged
      ? "Password successfully changed!"
      : "Profile updated successfully!";

    res
      .status(200)
      .json({ ...updatedBus.toObject(), message: responseMessage });
  } else {
    res.status(404).json({ message: "Bus not found" });
  }
});

// @desc    Delete a bus
// @route   DELETE /api/buses/:id
const deleteBusById = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);

  if (bus) {
    await bus.deleteOne({ _id: bus._id });
    res.status(200).json({ message: "Bus removed" });
  } else {
    res.status(404).json({ message: "Bus not found" });
  }
});

// @desc    Search buses by route
// @route   GET /api/buses/search
const searchBuses = asyncHandler(async (req, res) => {
  const { from, to } = req.body;
  const buses = await Bus.find({ from, to });

  if (buses.length > 0) {
    res.status(200).json(buses);
  } else {
    res.status(404).json({ message: "No buses found on this route" });
  }
});

const logoutCurrentBus = asyncHandler(async (req, res) => {
  res.cookie("bus_jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully!" });
});

export {
  getAllBuses,
  getBusById,
  createBus,
  authBus,
  getCurrentBus,
  updateBusById,
  deleteBusById,
  searchBuses,
  logoutCurrentBus,
};
