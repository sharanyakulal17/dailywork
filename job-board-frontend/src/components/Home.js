function Home() {
  return (
    <div style={{ background: "#1e90ff", padding: "40px", color: "white" }}>
      <h1>Job Board</h1>
      <h2>Find your Dream Job</h2>
      <p>Search and post jobs easily</p>

      <button
        onClick={() => alert("Resume uploaded (demo)")}
        style={{ marginRight: "10px" }}
      >
        Upload Your Resume
      </button>

      <button
        onClick={() =>
          document.getElementById("add-job-section").scrollIntoView()
        }
      >
        Post a Job
      </button>
    </div>
  );
}

export default Home;