import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Create this file for custom styles

const LandingPage = () => {
  return (
    <div className="landing-page d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-4">Welcome to the To-Do App</h1>
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
