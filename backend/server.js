require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* ==============================
   MIDDLEWARE
============================== */

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend-domain.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ==============================
   ROUTES
============================== */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));

/* ==============================
   HEALTH CHECK
============================== */

app.get("/", (req, res) => {
  res.send("MySQL Habit Tracker API Running 🚀");
});

/* ==============================
   GLOBAL ERROR HANDLER
============================== */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

/* ==============================
   SERVER
============================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});