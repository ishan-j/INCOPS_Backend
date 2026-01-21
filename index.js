const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // mysql-service
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Register API
app.post("/auth/register", (req, res) => {
  const { username, email, password } = req.body;

  const sql = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [username, email, password], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "User already exists" });
    }

    res.json({ message: "User registered successfully" });
  });
});

// Health check (VERY IMPORTANT for K8s)
app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
