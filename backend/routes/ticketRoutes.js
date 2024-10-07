import express from "express";

import {
  createTicket,
  getTicketsByUser,
  getTicketById,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

// @desc    Create a new ticket, Get all tickets for a user
router.route("/").post(createTicket).get(getTicketsByUser);

// @desc    Get a single ticket by ID, Delete a ticket
router.route("/:id").get(getTicketById).delete(deleteTicket);

export default router;
