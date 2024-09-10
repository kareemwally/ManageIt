import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Ensure this is linked to the CSS we just created

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="text-center">
        <h1>Welcome to the To-Do App</h1>
        <p className="lead">Organize your tasks and boost your productivity!</p>
        <div className="mt-4">
          <Link to="/login">
            <button className="btn btn-primary btn-lg mx-2">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-secondary btn-lg mx-2">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
