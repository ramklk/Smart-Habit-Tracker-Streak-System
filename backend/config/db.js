const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2004",
  database: "habit_tracker",
});

const promisePool = pool.promise();

// Test connection immediately
promisePool.execute("SELECT 1")
  .then(() => console.log("✅ MySQL Connected"))
  .catch(err => console.error("❌ MySQL Connection Failed:", err));

module.exports = promisePool;