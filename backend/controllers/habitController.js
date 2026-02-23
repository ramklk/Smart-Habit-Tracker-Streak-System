const db = require("../config/db");

// ==============================
// Create Habit
// ==============================
exports.createHabit = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    await db.execute(
      "INSERT INTO habits (user_id, title) VALUES (?, ?)",
      [userId, title]
    );

    res.status(201).json({ message: "Habit created successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get User Habits
// ==============================
exports.getHabits = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.execute(
      "SELECT * FROM habits WHERE user_id = ?",
      [userId]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Check-In Habit (Transaction Version)
// ==============================
exports.checkInHabit = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { id } = req.params;
    const today = new Date().toISOString().split("T")[0];

    await connection.beginTransaction();

    // Check if today already completed
    const [existing] = await connection.execute(
      "SELECT * FROM habit_logs WHERE habit_id = ? AND completed_date = ?",
      [id, today]
    );

    if (existing.length > 0) {
      // 🔥 UNCHECK
      await connection.execute(
        "DELETE FROM habit_logs WHERE habit_id = ? AND completed_date = ?",
        [id, today]
      );
    } else {
      // 🔥 CHECK
      await connection.execute(
        "INSERT INTO habit_logs (habit_id, completed_date) VALUES (?, ?)",
        [id, today]
      );
    }

    // Get all logs ordered DESC
    const [logs] = await connection.execute(
      "SELECT completed_date FROM habit_logs WHERE habit_id = ? ORDER BY completed_date DESC",
      [id]
    );

    let streak = 0;
    let currentDate = new Date(today);

    for (let log of logs) {
      const logDate = new Date(log.completed_date);

      if (logDate.toDateString() === currentDate.toDateString()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Determine last completed date
    const lastCompleted = logs.length > 0 ? logs[0].completed_date : null;

    await connection.execute(
      `UPDATE habits
       SET current_streak = ?,
           longest_streak = GREATEST(longest_streak, ?),
           last_completed = ?
       WHERE id = ?`,
      [streak, streak, lastCompleted, id]
    );

    await connection.commit();

    res.json({ message: "Habit toggled", streak });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

// ==============================
// Delete Habit
// ==============================
exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [result] = await db.execute(
      "DELETE FROM habits WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json({ message: "Habit deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ==============================
// Weekly Stats
// ==============================
exports.getWeeklyStats = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT DATE_FORMAT(completed_date, '%Y-%m-%d') AS completed_date
       FROM habit_logs
       WHERE habit_id = ?
       AND completed_date >= CURDATE() - INTERVAL 7 DAY`,
      [id]
    );

    // Return ARRAY of dates
    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Monthly Stats
// ==============================
exports.getMonthlyStats = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT COUNT(*) AS totalCompleted
       FROM habit_logs
       WHERE habit_id = ?
       AND MONTH(completed_date) = MONTH(CURDATE())
       AND YEAR(completed_date) = YEAR(CURDATE())`,
      [id]
    );

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Last 30 Days Data
// ==============================
exports.getLast30DaysData = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT completed_date
       FROM habit_logs
       WHERE habit_id = ?
       AND completed_date >= CURDATE() - INTERVAL 30 DAY
       ORDER BY completed_date ASC`,
      [id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOverallStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total habits
    const [totalHabitsResult] = await db.execute(
      "SELECT COUNT(*) AS total FROM habits WHERE user_id = ?",
      [userId]
    );

    const totalHabits = totalHabitsResult[0].total;

    // Weekly completions
    const [weeklyResult] = await db.execute(
      `SELECT COUNT(*) AS total
       FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = ?
       AND hl.completed_date >= CURDATE() - INTERVAL 7 DAY`,
      [userId]
    );

    const weeklyCompletions = weeklyResult[0].total;

    // Monthly completions
    const [monthlyResult] = await db.execute(
      `SELECT COUNT(*) AS total
       FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = ?
       AND MONTH(hl.completed_date) = MONTH(CURDATE())
       AND YEAR(hl.completed_date) = YEAR(CURDATE())`,
      [userId]
    );

    const monthlyCompletions = monthlyResult[0].total;

    // Success rate (simple logic)
    const successRate =
      totalHabits > 0
        ? Math.round((weeklyCompletions / (totalHabits * 7)) * 100)
        : 0;

    res.json({
      totalHabits,
      weeklyCompletions,
      monthlyCompletions,
      successRate,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};