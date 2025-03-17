<<<<<<< HEAD
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import DonationForm from './components/DonationForm';
import DonationConfirmation from './components/DonationConfirmation';
import PickupSchedule from './components/PickupSchedule';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/donation-form" component={DonationForm} />
        <Route path="/donation-confirmation" component={DonationConfirmation} />
        <Route path="/pickup-schedule" component={PickupSchedule} />
      </Switch>
    </Router>
=======
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} /> {/* Add this line */}
    </Routes>
>>>>>>> Rebaone-Vilakazi
  );
}

export default App;
