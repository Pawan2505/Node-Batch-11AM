import React from 'react'
import { useNavigate } from "react-router-dom";
const Dashboard = () => {

  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <h1>Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
