const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql-service",      // mysql-service
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
app.post("/api/auth/register", (req, res) => {
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

// Login API
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = `
    SELECT id, username, email FROM users
    WHERE email = ? AND password = ?
  `;

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ 
      message: "Login successful",
      user: results[0]
    });
  });
});

// Health check (VERY IMPORTANT for K8s)
app.get("/api/health", (req, res) => {
  res.send("OK");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
