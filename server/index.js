const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/jobboard")
  .then(() => console.log("MongoDB connected - index.js:13"))
  .catch((err) => console.error("MongoDB connection error: - index.js:14", err));

// Routes
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);

// Start server
app.listen(5000, () => console.log("Server running on port 5000 - index.js:24"));