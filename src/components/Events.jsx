import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url =
      "https://api.allorigins.win/raw?url=" +
      encodeURIComponent("https://devpost.com/hackathons");

    fetch(url)
      .then(res => res.text())
      .then(html => {
        // very simple extraction (title-based)
        const matches = html.match(/<h3.*?>(.*?)<\/h3>/g) || [];
        const cleaned = matches.slice(0, 6).map((item, index) => ({
          id: index,
          name: item.replace(/<[^>]*>/g, ""),
          url: "https://devpost.com/hackathons",
        }));

        setEvents(cleaned);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading live hackathons...</p>;

  return (
    <div className="events-section">
      <h3>🚀 Live Hackathons (Devpost)</h3>

      {events.length === 0 && <p>No events found.</p>}

      {events.map(event => (
        <div key={event.id} className="event-card">
          <h4>{event.name}</h4>
          <a href={event.url} target="_blank" rel="noreferrer">
            View on Devpost →
          </a>
        </div>
      ))}
    </div>
  );
}

export default Events;



