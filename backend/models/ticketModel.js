import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Bus",
  },
  qrLink: {
    type: String,
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Booking",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
