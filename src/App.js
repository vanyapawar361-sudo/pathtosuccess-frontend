import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  // LOGIN STATE
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("user")
  );

  // RESOURCES
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("savedResources") || "[]")
  );
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("completedResources") || "[]")
  );

  // FETCH RESOURCES
  useEffect(() => {
  fetch("https://college-resources-backend-2.onrender.com/api/resources")

      .then(res => res.json())
      .then(data => setResources(data))
      .catch(() => setError("Failed to fetch resources"));
  }, []);

  // CLEAN COMPLETED IDS IF RESOURCE DELETED
  useEffect(() => {
    setCompleted(prev =>
      prev.filter(id => resources.some(r => r._id === id))
    );
  }, [resources]);

  // SYNC LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("savedResources", JSON.stringify(saved));
    localStorage.setItem("completedResources", JSON.stringify(completed));
  }, [saved, completed]);

  // ADD RESOURCE
  const addResource = async (e) => {
    e.preventDefault();
    const newResource = { title, link, category, type };

    try {
      const res = await fetch("https://college-resources-backend-2.onrender.com/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResource),
      });

      const data = await res.json();
      setResources([...resources, data]);

      setTitle("");
      setLink("");
      setCategory("");
      setType("");
    } catch {
      setError("Failed to add resource");
    }
  };

  // TOGGLE SAVE
  const toggleSave = (id) => {
    setSaved(prev => {
      const updated = prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id];
      localStorage.setItem("savedResources", JSON.stringify(updated));
      return updated;
    });
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setCompleted(prev => {
      const updated = prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id];
      localStorage.setItem("completedResources", JSON.stringify(updated));
      return updated;
    });
  };

  // DELETE RESOURCE
const deleteResource = async (id) => {
  try {
    const res = await fetch(`https://college-resources-backend-2.onrender.com/api/resources/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Delete failed");

    setResources(prev => prev.filter(r => r._id !== id));
    setSaved(prev => prev.filter(i => i !== id));
    setCompleted(prev => prev.filter(i => i !== id));

  } catch (err) {
    alert("Failed to delete resource");
    console.error(err);
  }
};


  // PROGRESS
  const totalResources = resources.length;
  const completedCount = resources.filter(r =>
    completed.includes(r._id)
  ).length;
  const progress = totalResources === 0 ? 0 : Math.round((completedCount / totalResources) * 100);

  // LOGIN
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  // LOADING
  if (resources.length === 0 && !error) {
    return <p style={{ textAlign: "center" }}>Loading resources...</p>;
  }

  // MAIN RETURN
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <nav className="navbar">
        <h1>Curatd</h1>
        <div>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              setLoggedIn(false);
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <Dashboard
          resources={resources}
          completed={completed}
        />

        <h2>Add to Stack✍🏻</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={addResource} className="form">
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input placeholder="Link" value={link} onChange={e => setLink(e.target.value)} required />
          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
          <input placeholder="Type (Video / Article)" value={type} onChange={e => setType(e.target.value)} required />
          <button type="submit">Add Resource</button>
        </form>

        <div className="cards">
          {resources.map(r => {
            const isSaved = saved.includes(r._id);
            const isCompleted = completed.includes(r._id);

            return (
              <div className="card" key={r._id}>
                <h3>{r.title}</h3>
                <p>{r.category} • {r.type}</p>

                <div className="actions">
                  

                  <button onClick={() => toggleComplete(r._id)}>
                    {isCompleted ? "✅ Completed" : "⬜ Mark Complete"}
                  </button>

                  <button className="delete" onClick={() => deleteResource(r._id)}>
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
      <Home
        resources={resources}
        saved={saved}
        completed={completed}
        toggleSave={toggleSave}
        toggleComplete={toggleComplete}
        deleteResource={deleteResource}
        addResource={addResource}
        title={title}
        setTitle={setTitle}
        link={link}
        setLink={setLink}
        category={category}
        setCategory={setCategory}
        type={type}
        setType={setType}
        error={error}
      />
    </div>
  );
}

export default App;















