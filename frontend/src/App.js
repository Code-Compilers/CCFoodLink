import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import DonateesDashboard from "./components/DonateesDashboard";
import Login from "./components/Login";
import Donations from "./components/Donation";
import Register from "./components/Register";
import About from "./components/About";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="donatee-dashboard" element={<DonateesDashboard />} />
        <Route path="donation" element={<Donations />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
