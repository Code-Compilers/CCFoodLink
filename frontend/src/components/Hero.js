import React from "react";
import "../Css/Hero.css";

const Hero = () => {
  return (
    <section id="hero1" className="hero">
      <div className="inner">
        <div className="copy">
          <h1>Food Donation Platform</h1>
          <br></br>
          <br></br>
          <p>
            Join us in the fight against hunger. Your food donation can make a
            real difference in the lives of South Africans in need.
          </p>
          <a href="/register" className="donate-btn">
            Donate Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
