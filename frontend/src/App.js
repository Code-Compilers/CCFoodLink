import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
