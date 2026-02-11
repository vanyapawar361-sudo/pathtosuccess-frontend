import React, { useState } from "react";
import Dashboard from "./Dashboard";
import StudyPlanner from "./StudyPlanner";

function Home({
  resources,
  saved,
  completed,
  toggleSave,
  toggleComplete,
  deleteResource,
  addResource,
  title,
  setTitle,
  link,
  setLink,
  category,
  setCategory,
  type,
  setType,
  error,
}) {
  // ✅ STATE DEFINED ONCE, AT TOP
  const [showPlanner, setShowPlanner] = useState(false);

  return (
    <div className="container">
      {/* DASHBOARD */}
      <Dashboard resources={resources} completed={completed} />

      {/* STUDY PLANNER BUTTON (GLOBAL, NOT PER CARD) */}
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <button
          className="planner-btn"
          onClick={() => setShowPlanner(prev => !prev)}
        >
          📘 Study Planner
        </button>
      </div>

      {/* SHOW ONLY WHEN CLICKED */}
      {showPlanner && <StudyPlanner />}

      <h2>Free Resources</h2>
      {error && <p className="error">{error}</p>}

      {/* ADD RESOURCE FORM */}
      <form onSubmit={addResource} className="form">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          placeholder="Type (Video / Article)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <button type="submit">Add Resource</button>
      </form>

      {/* RESOURCE LIST */}
      <div className="cards">
        {resources.map((r) => {
          const isSaved = saved.includes(r._id);
          const isCompleted = completed.includes(r._id);

          return (
            <div className="card" key={r._id}>
              <h3>{r.title}</h3>
              <p>{r.category} • {r.type}</p>

              <div className="actions">
                <button onClick={() => toggleSave(r._id)}>
                  {isSaved ? "⭐ Saved" : "☆ Save"}
                </button>

                <button onClick={() => toggleComplete(r._id)}>
                  {isCompleted ? "✅ Completed" : "⬜ Mark Complete"}
                </button>

                <button
                  className="delete"
                  onClick={() => deleteResource(r._id)}
                >
                  🗑 Delete
                </button>
              </div>

              <a href={r.link} target="_blank" rel="noreferrer">
                Open Resource →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;




