import React from "react";
import { Link, Route } from "react-router-dom"; // Import Link for navigation
import "../Css/HomePage.css"; // Import the CSS file for styling
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
};

export default HomePage;
