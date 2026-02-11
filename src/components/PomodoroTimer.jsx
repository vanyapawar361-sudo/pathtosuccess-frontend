import { useEffect, useState } from "react";

function PomodoroTimer() {
  const WORK_TIME = 50 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      if (!isBreak) {
        alert("Work session complete! Take a break 🧠");
        setIsBreak(true);
        setTime(BREAK_TIME);
      } else {
        alert("Break over! Back to work 💪");
        setIsBreak(false);
        setTime(WORK_TIME);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, time, isBreak]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", width: "250px" }}>
      <h3>{isBreak ? "Break Time ☕" : "Pomodoro 💪"}</h3>

      <h1>{formatTime(time)}</h1>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)} style={{ marginLeft: "10px" }}>
        Pause
      </button>
      <button
        onClick={() => {
          setIsRunning(false);
          setIsBreak(false);
          setTime(WORK_TIME);
        }}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button><br></br>
    </div>
  );
}

export default PomodoroTimer;
