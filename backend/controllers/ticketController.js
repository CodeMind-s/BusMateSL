import Ticket from "../models/ticketModel.js";
import Booking from "../models/bookingModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Create a new ticket
// @route   POST /api/tickets
const createTicket = asyncHandler(async (req, res) => {
  const { user, bus, qrLink, booking } = req.body;

  // Check if the booking exists
  const bookingExists = await Booking.findById(booking);
  if (!bookingExists) {
    res.status(404).json({ message: "Booking not found" });
    return;
  }

  const ticket = new Ticket({
    user,
    bus,
    qrLink,
    booking,
  });

  const createdTicket = await ticket.save();
  res.status(201).json(createdTicket);
});

// @desc    Get all tickets for a user
// @route   GET /api/tickets/user/:userId
const getTicketsByUser = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find(req.params.userId)
    .populate("user", "name email contact")
    .populate("bus", "busNumber from to")
    .populate("booking");

  if (tickets.length > 0) {
    res.status(200).json(tickets);
  } else {
    res.status(404).json({ message: "No tickets found for this user" });
  }
});

// @desc    Get a single ticket by ID
// @route   GET /api/tickets/:id
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate("user", "name email contact")
    .populate("bus", "busNumber from to")
    .populate("booking");

  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
});

// @desc    Update a ticket's QR link
// @route   PUT /api/tickets/:id
const updateTicket = asyncHandler(async (req, res) => {
  const { qrLink } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.qrLink = qrLink || ticket.qrLink;

    const updatedTicket = await ticket.save();
    res.status(200).json(updatedTicket);
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
});

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    await ticket.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Ticket removed" });
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
});

export {
  createTicket,
  getTicketsByUser,
  getTicketById,
  updateTicket,
  deleteTicket,
};
