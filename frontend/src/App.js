
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Donations from "./components/Donation"
import Register from "./components/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
<div>
      <Navbar />      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="donation" element={<Donations />} />
        {/* You can add more routes for About, Login, etc. */}
      </Routes>
    </div>
  );
}

export default App;
