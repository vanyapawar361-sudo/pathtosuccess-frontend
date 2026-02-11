import React, { useState } from "react";
import html2pdf from "html2pdf.js";

const StudyPlanner = () => {
  const [planner, setPlanner] = useState(
    JSON.parse(localStorage.getItem("studyPlanner")) || {
      week: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      notes: "",
    }
  );

  const handleChange = (e) => {
    setPlanner({ ...planner, [e.target.name]: e.target.value });
  };

  const savePlanner = () => {
    localStorage.setItem("studyPlanner", JSON.stringify(planner));
    alert("Study Planner Saved ✅");
  };

  const downloadPDF = () => {
    const element = document.getElementById("planner-pdf");
    html2pdf().from(element).save("Study_Planner.pdf");
  };

  return (
    <div className="planner-container">
      <div id="planner-pdf" className="planner-card">
        <h2>📅 Weekly Study Planner</h2>

        <input
          type="text"
          name="week"
          placeholder="Week (e.g. 12–18 Feb)"
          value={planner.week}
          onChange={handleChange}
        />

        <div className="planner-grid">
          <textarea name="monday" placeholder="Monday" value={planner.monday} onChange={handleChange} />
          <textarea name="tuesday" placeholder="Tuesday" value={planner.tuesday} onChange={handleChange} />
          <textarea name="wednesday" placeholder="Wednesday" value={planner.wednesday} onChange={handleChange} />
          <textarea name="thursday" placeholder="Thursday" value={planner.thursday} onChange={handleChange} />
          <textarea name="friday" placeholder="Friday" value={planner.friday} onChange={handleChange} />
        </div>

        <textarea
          name="notes"
          placeholder="Notes / Goals for this week"
          value={planner.notes}
          onChange={handleChange}
        />
      </div>

      <div className="planner-actions">
        <button onClick={savePlanner}>💾 Save</button>
        <button onClick={downloadPDF}>📄 Download PDF</button>
      </div>
    </div>
  );
};

export default StudyPlanner;
