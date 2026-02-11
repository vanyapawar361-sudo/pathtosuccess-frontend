function ResourceCard({ resource, onSave }) {
  return (
    <div className="card">
      <h3>{resource.title}</h3>
      <p>{resource.category} • {resource.type}</p>

      <a href={resource.link} target="_blank" rel="noreferrer">
        Open Resource
      </a>

      <button onClick={() => onSave(resource)}>
        ➕ Add to My Resources
      </button>
    </div>
  );
}

export default ResourceCard;
