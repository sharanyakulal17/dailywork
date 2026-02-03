const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Add Job
router.post("/", async (req, res) => {
  try {
    const { title, company, location } = req.body;
    const job = new Job({ title, company, location });
    await job.save();
    res.status(201).json({ message: "Job added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add job" });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

module.exports = router;