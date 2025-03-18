import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import DonorDashboard from './components/DonorDashboard';
import DonationConfirmation from "./components/DonationConfirmation";

function App() {
  console.log('App component rendered');
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
      <Route path="donation-confirmation" element={<DonationConfirmation />} />
    </Routes>
  );
}

export default App;
