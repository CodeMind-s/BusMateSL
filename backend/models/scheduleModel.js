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
  date: {
    type: Date,
    required: true,
  },
  status: {
      type: String,
      required: true,
      default: "InComplete",
      enum: ["InComplete", "InProgress", "Complete"],
    },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
