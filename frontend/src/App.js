import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import DonatorDashboard from "./components/DonatorDashboard";
import DonateeDashboard from "./components/DonateeDashboard";
import AuthService from "./services/auth.service";

const App = () => {
  const PrivateRoute = ({ children, roles }) => {
    const currentUser = AuthService.getCurrentUser();
    
    if (!currentUser) {
      // not logged in so redirect to login page
      return <Navigate to="/login" />;
    }

    // check if route is restricted by role
    if (roles && !roles.some(role => currentUser.roles.includes(role))) {
      // role not authorized so redirect to home page
      return <Navigate to="/" />;
    }

    // authorized so return child components
    return children;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/donator/*" 
          element={
            <PrivateRoute roles={["ROLE_DONATOR"]}>
              <DonatorDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/donatee/*" 
          element={
            <PrivateRoute roles={["ROLE_DONATEE"]}>
              <DonateeDashboard />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;