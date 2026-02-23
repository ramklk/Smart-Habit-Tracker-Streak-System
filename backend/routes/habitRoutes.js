const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const habitController = require("../controllers/habitController");

router.post("/", authMiddleware, habitController.createHabit);
router.get("/", authMiddleware, habitController.getHabits);
router.put("/:id/checkin", authMiddleware, habitController.checkInHabit);
router.delete("/:id", authMiddleware, habitController.deleteHabit);
router.get("/:id/weekly", authMiddleware, habitController.getWeeklyStats);
router.get("/:id/monthly", authMiddleware, habitController.getMonthlyStats);
router.get("/:id/last30", authMiddleware, habitController.getLast30DaysData);
router.get("/stats", authMiddleware, habitController.getOverallStats);

module.exports = router;