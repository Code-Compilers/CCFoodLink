import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Css/HomePage.css"; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to CC Food Link </h1>
      <h1>Nourishing Communities Throgh Food Donation </h1>
      <p>We believe that NO ONE should go HUNGRY</p>
      <Link to="/register">Donate Now</Link>

      <img
        src="/FoodBg.jpg"
        alt="Background"
        className="background-image"
        width="fit"
        height="fit"
      />
    </div>
  );
};

export default HomePage;
