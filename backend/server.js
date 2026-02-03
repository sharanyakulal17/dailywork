const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/project-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected - server.js:13"))
  .catch((err) => console.error(err));

// Task schema
const TaskSchema = new mongoose.Schema({
  title: String,
  deadline: Date,
  status: { type: String, default: "To Do" },
});

// Project schema
const ProjectSchema = new mongoose.Schema({
  name: String,
  tasks: [TaskSchema],
});

const Project = mongoose.model("Project", ProjectSchema);

// Routes
app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/projects", async (req, res) => {
  const project = new Project({ name: req.body.name, tasks: [] });
  await project.save();
  res.json(project);
});

app.post("/projects/:projectId/tasks", async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ error: "Project not found" });

  const task = { title: req.body.title, deadline: req.body.deadline };
  project.tasks.push(task);
  await project.save();
  res.json(project);
});

app.put("/projects/:projectId/tasks/:taskId", async (req, res) => {
  const { projectId, taskId } = req.params;
  const { status } = req.body;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ error: "Project not found" });

  const task = project.tasks.id(taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.status = status;
  await project.save();
  res.json(task);
});

app.listen(5000, () => console.log("Server running on port 5000 - server.js:69"));