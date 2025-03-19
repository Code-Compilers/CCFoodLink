import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Css/HomePage.css"; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to CC Food Link</h1>
        <h2>Nourishing Communities Through Food Donation</h2>
        <p>We believe that NO ONE should go HUNGRY</p>
        <img src="/FoodBg.jpg" alt="Food Donation" width="300px" height="fit" />
        <Link to="/register" className="donate-link">Donate Now</Link>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          At CC Food Link, we are dedicated to reducing food waste and fighting hunger in our communities. Our mission is to ensure that surplus food from individuals, restaurants, grocery stores, and businesses doesn't end up in landfills but is instead redistributed to those in need.
        </p>
        </section>
        <section className="images-container">
        <div className="image-box">
          <img src="food-donation.jpg" alt="Food Donation" width="300px" height="fit" />
          <p>Food Donation</p>
        </div>
        <div className="image-box">
          <img src="food-waste.jpg" alt="Food Waste" width="300px" height="fit"/>
          <p>Food Waste Awareness</p>
        </div>
        <div className="image-box">
          <img src="community-help.jpg" alt="Community Help" width="300px" height="fit"/>
          <p>Helping the Community</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <p>
          We work with local donors, including restaurants, grocery stores, and individuals, to collect food that would otherwise be thrown away. Our team sorts, packs, and delivers this food to local food banks, shelters, and community centers.
        </p>
      </section>

      {/* Get Involved Section */}
      <section className="get-involved-section">
        <h2>Get Involved</h2>
        <p>
          You can make a difference too! Whether you're an individual looking to donate food, a business with surplus food, or someone who simply wants to help raise awareness, there are many ways to get involved.
        </p>
        <Link to="/register" className="cta-link">Donate Now</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 CC Food Link | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
