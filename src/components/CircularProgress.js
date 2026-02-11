import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularProgress({ completed, total }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={{ width: 150, margin: "20px auto" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: "#22c55e",       // Green color
          textColor: "#fff",           // White text
          trailColor: "rgba(255,255,255,0.2)",
          textSize: "16px",
        })}
      />
      <p style={{ textAlign: "center", marginTop: "10px", color: "#fff" }}>
        {completed} of {total} resources completed
      </p>
    </div>
  );
}

export default CircularProgress;
