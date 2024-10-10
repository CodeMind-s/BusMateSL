import express from "express";
import {
  createBus,
  deleteBusById,
  getAllBuses,
  getBusById,
  authBus,
  getCurrentBus,
  searchBuses,
  updateBusById,
  logoutCurrentBus,
} from "../controllers/busController.js";
import {
  authenticate,
  authenticateBus,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createBus).get(getAllBuses);

router.post("/auth", authBus);
router.post("/logout", logoutCurrentBus);

router.get("/search", searchBuses);

router
  .route("/profile")
  .get(authenticateBus, getCurrentBus)
  .put(authenticateBus, updateBusById);

router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteBusById)
  .get(getBusById);

export default router;
