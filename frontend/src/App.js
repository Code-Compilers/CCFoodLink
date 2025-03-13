import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
<div>
      <Navbar /> {<Navbar/>}
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<Register />} />
        {/* You can add more routes for About, Login, etc. */}
      </Routes>
    </div>
  );
}

export default App;
