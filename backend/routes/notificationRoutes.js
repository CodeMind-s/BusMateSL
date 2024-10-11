import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";

import {
  createNotification,
  deleteNotification,
  getAllNotifications,
  getNotificationById,
  getNotificationsByBus,
  updateNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// @desc    Create a new payment, Get all payment for a user
router.route("/").post(createNotification).get(getAllNotifications);

// @desc    Get all payments related to user
router.route("/bus-notification/:id").get(getNotificationsByBus);

// @desc    Get a single payment by ID, Delete a payment
router
  .route("/:id")
  .put(updateNotification)
  .delete(deleteNotification)
  .get(getNotificationById);

export default router;
