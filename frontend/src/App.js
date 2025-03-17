import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import DonationConfirmation from "./components/DonationConfirmation";

function App() {
  console.log('App component rendered');
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="register" element={<Register />} />
      <Route path="donation-confirmation" element={<DonationConfirmation />} />
    </Routes>
  );
}

export default App;
