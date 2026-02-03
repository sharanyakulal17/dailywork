import { useState, useEffect } from "react";
import axios from "axios";

function Jobs({ view, goBack }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (view === "available") fetchJobs();
  }, [view]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addJob = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/jobs", { title, company, location });
      setMessage(res.data.message);
      setTitle(""); setCompany(""); setLocation("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add job");
    }
  };

  if (view === "add") {
    return (
      <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
        <h3>Add Job</h3>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} /><br />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} /><br />
        <button onClick={addJob}>Add Job</button>
        <button onClick={goBack} style={{ marginLeft: "10px" }}>Back</button>
        {message && <p>{message}</p>}
      </div>
    );
  }

  if (view === "available") {
    return (
      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h3>Available Jobs</h3>
        <button onClick={goBack}>Back</button>
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>{job.title} - {job.company} ({job.location})</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

export default Jobs;