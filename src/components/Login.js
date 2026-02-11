import { useState } from "react";
import "./Login.css"; // import the CSS

function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", email);
    onLogin();
  };

  return (
    <div className="login-container">
      <h1>Curatd-only what matters🎓</h1>
      <p>Your personal study databse</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

