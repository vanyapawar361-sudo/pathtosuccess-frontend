import React from "react";

function Dashboard({ resources = [] }) {
  // Always read from localStorage
  const completedIds = JSON.parse(
    localStorage.getItem("completedResources") || "[]"
  );

  // Count ONLY valid completed resources
  const completedCount = resources.filter(r =>
    completedIds.includes(r._id)
  ).length;

  const total = resources.length;

  const progress =
    total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="dashboard">
      <h2>📊 Your Progress</h2>
      <p>{completedCount} of {total} completed</p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>{progress}%</p>
    </div>
  );
}

export default Dashboard;




