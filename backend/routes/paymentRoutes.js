import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";

import { createPayment, deletePayment, getPaymentById, getPaymentByUser } from "../controllers/paymentController.js";

const router = express.Router();

// @desc    Create a new payment, Get all payment for a user
router.route("/").post(authenticate, createPayment);

// @desc    Get all payments related to user
router.route("/user-payment").get(authenticate, getPaymentByUser)

// @desc    Get a single payment by ID, Delete a payment
router.route("/:id").get(getPaymentById).delete(deletePayment);

export default router;
