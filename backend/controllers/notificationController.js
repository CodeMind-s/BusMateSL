import Notification from "../models/notificationModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Create a new Notification
// @route   POST /api/notifications
const createNotification = asyncHandler(async (req, res) => {
  const { busId, title, message } = req.body;

  const notification = new Notification({
    busId,
    title,
    message,
  });

  const createdNotification = await notification.save();
  res.status(201).json(createdNotification);
});

// @desc    Get all notifications for a bus
// @route   GET /api/notifications/bus-notifications
const getNotificationsByBus = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({busId: req.params.id})
    .populate("busId")
  
    if (notifications.length > 0) {
      res.status(200).json(notifications);
    } else {
      res.status(404).json({ message: "No notifications found for this bus" });
    }
  });

// @desc    Get a notifications by ID
// @route   GET /api/notifications/:id
const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)
  .populate("busId")

  if (notification) {
    res.status(200).json(notification);
  } else {
    res.status(404).json({ message: "notification not found" });
  }
});

// @desc    Get a notifications by ID
// @route   GET /api/notifications
const getAllNotifications = asyncHandler(async (req, res) => {
  const notification = await Notification.find({})
  .populate("busId")

  if (notification) {
    res.status(200).json(notification);
  } else {
    res.status(404).json({ message: "notifications not found" });
  }
});

// @desc    Update a notifications
// @route   PUT /api/notifications/:id
const updateNotification = asyncHandler(async (req, res) => {
  const { title, message} = req.body;

  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.title = title || notification.title;
    notification.message = message || notification.message;

    const updatedNotification = await notification.save();
    res.status(200).json(updatedNotification);
  } else {
    res.status(404).json({ message: "Notification not found" });
  }
});

// @desc    Delete a notifications
// @route   DELETE /api/notifications/:id
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    await notification.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "notification removed" });
  } else {
    res.status(404).json({ message: "notification not found" });
  }
});

export {
    createNotification,
    getAllNotifications,
    getNotificationsByBus,
    getNotificationById,
    updateNotification,
    deleteNotification
};
