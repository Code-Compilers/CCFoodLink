import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../Css/DonationConfirmation.css"; // Import the CSS file for styling

const DonationConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { donorName, contactDetails, foodCategory, deliveryOption, physicalAddress, description, date } = location.state || {};

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewDashboard = () => {
    navigate('/donor-dashboard');
  };

  return (
    <div className="confirmation-container">
      <h1>Thank You for Your Donation!</h1>
      <p>Your generosity helps us make a difference.</p>
      <p>Donation Details:</p>
      <ul>
        <li>Donor Name: {donorName}</li>
        <li>Contact Details: {contactDetails}</li>
        <li>Food Category: {foodCategory}</li>
        <li>Delivery Option: {deliveryOption}</li>
        <li>Physical Address: {physicalAddress}</li>
        <li>Description: {description}</li>
        <li>Donation Date: {date}</li>
      </ul>
      <button onClick={handleBackToHome}>Back to Home</button>
      <button onClick={handleViewDashboard}>View Dashboard</button>
    </div>
  );
};

export default DonationConfirmation;