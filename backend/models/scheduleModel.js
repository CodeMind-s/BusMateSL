import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Bus",
  },
  startLocation: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
