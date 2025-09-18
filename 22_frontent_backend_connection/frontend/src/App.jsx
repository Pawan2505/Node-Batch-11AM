import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";




function App() {
  const isAuth = localStorage.getItem("token"); // check JWT

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route 
          path="/dashboard" 
          element={isAuth ? <Dashboard/> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
