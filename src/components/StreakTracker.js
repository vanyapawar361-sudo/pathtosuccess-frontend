import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function StreakTracker() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const lastActive = localStorage.getItem("lastActive");
    let currentStreak = parseInt(localStorage.getItem("streak") || "0");
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastActive !== today) {
      if (lastActive === yesterday) {
        currentStreak += 1;
      } else {
        currentStreak = 1; // reset streak
      }
      localStorage.setItem("streak", currentStreak);
      localStorage.setItem("lastActive", today);
    }

    setStreak(currentStreak);
  }, []);

  return (
    <div style={{ width: 120, margin: "20px auto" }}>
      <CircularProgressbar
        value={streak}
        maxValue={30} // optional: max streak in a month
        text={`${streak} 🔥`}
        styles={buildStyles({
          pathColor: "#facc15",
          textColor: "#fff",
          trailColor: "rgba(255,255,255,0.2)",
          textSize: "16px",
        })}
      />
      <p style={{ textAlign: "center", marginTop: "5px", color: "#fff" }}>
        Daily Streak
      </p>
    </div>
  );
}

export default StreakTracker;
