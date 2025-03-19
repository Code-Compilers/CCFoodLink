import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Css/DonorDashboard.css"; // Import the CSS file for styling

const DonorDashboard = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch donation history from the server or local storage
    const fetchDonationHistory = async () => {
      // Replace with actual API call
      const response = await fetch('/api/donation-history');
      const data = await response.json();
      setDonationHistory(data);
    };

    fetchDonationHistory();
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Donor Dashboard</h1>
      <p>Here is your donation history:</p>
      <ul>
        {donationHistory.map((donation, index) => (
          <li key={index}>
            <p>Donor Name: {donation.donorName}</p>
            <p>Contact Details: {donation.contactDetails}</p>
            <p>Food Category: {donation.foodCategory}</p>
            <p>Delivery Option: {donation.deliveryOption}</p>
            <p>Physical Address: {donation.physicalAddress}</p>
            <p>Description: {donation.description}</p>
            <p>Donation Date: {donation.date}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default DonorDashboard;