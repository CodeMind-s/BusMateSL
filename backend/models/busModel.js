import mongoose from "mongoose";

const busSchema = mongoose.Schema({
  driverNumber: {
    type: String,
    required: true,
    unique: true,
  },
  conductorNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  seatCount: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  amenities: {
    freewifi: {
      type: Boolean,
      default: false,
    },
    AC: {
      type: Boolean,
      default: false,
    },
    usbCharging: {
      type: Boolean,
      default: false,
    },
    tv: {
      type: Boolean,
      default: false,
    },
    water: {
      type: Boolean,
      default: false,
    },
    cctv: {
      type: Boolean,
      default: false,
    },
    gps: {
      type: Boolean,
      default: false,
    },
  },
});

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
