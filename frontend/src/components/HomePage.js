import React from "react";
import { Link } from "react-router-dom"; // Import Link

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the default landing page of your application.</p>
      <Link to="/register">Go to Register</Link>{" "}
    </div>
  );
};

export default HomePage;
