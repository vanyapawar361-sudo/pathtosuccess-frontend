import React, { useEffect, useState } from "react";
import handpickedData from "../data/handpicked";
import noteTakingApps from "./noteTakingApps";
import StudyPlanner from "./StudyPlanner";
import PomodoroTimer from "./PomodoroTimer";
import Events from "./Events";

function Home() {
  const [handpicked, setHandpicked] = useState([]);
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
  const savedData = localStorage.getItem("handpicked");

  if (savedData) {
    setHandpicked(JSON.parse(savedData));
  } else {
    setHandpicked(handpickedData);
    localStorage.setItem("handpicked", JSON.stringify(handpickedData));
  }
}, []);


  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">Handpicked for you 🎓</h1><br></br>
        <p className="hero-subtitle">
          Everything a college student needs — curated just for you!
        </p><br></br>
      </section>

      {/* Handpicked Resources */}
      <section className="handpicked">
        <div className="cards">
          {handpicked.map((item) => (
            <article className="card" key={item.title}>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-tag">{item.tag}</p>
              <a
                className="card-link"
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                Open →
              </a>
            </article>
          ))}
        </div>
      </section>


      {/* Toolkit */}
      <section className="toolkit">
        <h2 className="my-heading ">🧰 College Survival Toolkit</h2>

        {/* Study Planner */}
        <div className="planner-section">
          <button
  className="planner-fab"
  onClick={() => setShowPlanner(prev => !prev)}
>
  📘
</button>


          {showPlanner && (
            <div className="planner-container">
              <StudyPlanner />
              <button
                className="my-headinggg"
                onClick={() => setShowPlanner(false)}
              >
                ❌ Close Planner
              </button>
            </div>
          )}
        </div>

        {/* Notes + Pomodoro */}
        <div className="toolkit-row">
          {/* Notes */}
          <div className="notes-section">
            <h3 className="my-headinggg">📝 Free Note-Taking Apps</h3><br></br>

            <div className="resources">
              {noteTakingApps.map((app) => (
                <article key={app.id} className="resource-card">
                  <h4 className="my-headinggg">{app.name}</h4>
                  <p className="my-headinggg">{app.description}</p>
                  <a
                    className="my-headinggg"
                    href={app.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open App
                  </a>
                </article>
              ))}
            </div>
          </div>

          {/* Pomodoro */}
          <div className="pomodoro-section">
            <h3 className="toolkit-heading">⏱ Pomodoro Timer</h3>
            <PomodoroTimer />
          </div>
        
        </div>
      </section>
    </div>
    
  );
}

export default Home;


