import React from "react";
import "../Css/About.css";
import foodDonation from "../assets/pexels-fajrinugroho-20489330.jpg";
import communityFeeding from "../assets/pexels-cenali-2733918.jpg";
import volunteer from "../assets/pexels-julia-m-cameron-6995221.jpg";
import sustainableFarming from "../assets/pexels-theshuttervision-12419505.jpg";

const About = () => {
  return (
    <div className="about">
      <h2 className="about-heading">Our Mission to End Food Insecurity</h2>
      <div className="cards-container">
        <div className="card">
          <img src={foodDonation} alt="Food Donation" />
          <h3>Food Collection</h3>
          <p>
            We gather surplus food from local suppliers, farms, and retailers to
            redistribute to those in need.
          </p>
        </div>

        <div className="card">
          <img src={communityFeeding} alt="Community Feeding" />
          <h3>Community Feeding</h3>
          <p>
            We organize feeding programs that provide nutritious meals to
            underprivileged communities.
          </p>
        </div>

        <div className="card">
          <img src={volunteer} alt="Volunteer Network" />
          <h3>Volunteer Network</h3>
          <p>
            Our dedicated volunteers help distribute food and raise awareness
            about food security challenges.
          </p>
        </div>

        <div className="card">
          <img src={sustainableFarming} alt="Sustainable Solutions" />
          <h3>Sustainable Solutions</h3>
          <p>
            We promote urban farming and sustainable food practices to empower
            communities long-term.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
