// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  deadline: Date,
  status: { type: String, default: "To Do" }, // Track progress
});

module.exports = mongoose.model("Task", taskSchema);