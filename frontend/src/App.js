import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import DonorDashboard from './components/DonorDashboard';
import DonationConfirmation from "./components/DonationConfirmation";

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Donations from "./components/Donation"
import Register from "./components/Register";
import Navbar from "./components/Navbar";

function App() {
  console.log('App component rendered');
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="donation-confirmation" element={<DonationConfirmation />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="donation" element={<Donations />} />
        {/* You can add more routes for About, Login, etc. */}
      </Routes>
  );
}

export default App;
