import express from "express";
import {
  createSchedule,
  getAllSchedules,
  getAllSchedulesByBus,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getSchedulesByLocation,
  getScheduleSeatsById,
} from "../controllers/scheduleController.js";
import { authenticateBus } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticateBus,createSchedule).get(getAllSchedules);

router.route("/bus").get(authenticateBus, getAllSchedulesByBus);

router
  .route("/:id")
  .get(getScheduleById)
  .put(updateSchedule)
  .delete(deleteSchedule);

router.route("/location").post(getSchedulesByLocation);

router.route("/seats/:id/:date").get(getScheduleSeatsById);

export default router;
