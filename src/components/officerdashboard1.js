import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Stats from './Stats';
import Graphs from './Graphs';
import TransactionsTable from './TransactionsTable';
import './officerdashboard.css';

const Dashboard1 = () => {
  const [loggedIn, setLoggedIn] = useState(true); // Define the loggedIn state
  const navigate = useNavigate(); // For navigation after logout
  const handleLogout = () => {
    // Remove token and other user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setLoggedIn(false); // Update loggedIn state to false
    navigate('/login'); // Redirect to home page after logout
};
  return (
    <div className="offdashboard">
      <header className="headeroff">
          <img src="logo.png" alt="MSU-IIT NMPC Logo" className="logooff"/>
          <h2 className="landingh2off">MSU-IIT National Multi-Purpose Cooperative</h2>
      </header>

      <div className="sidebar">
          <div className="profile">
              <img src="User_circle1.png" alt="Profile" className="profile-pic"/>
              <div className="profile-info">
                  <h3 className="username">Nicholas Patrick</h3>
                  <div className="username-divider"></div>
                  <p className="role">Loan Clerk</p>
              </div>
          </div>
          <nav className="nav-menu">
              <Link to="/officerdashboard1">Dashboard</Link>
              <Link to="/OfficerDashboard2">Loan Applications</Link>
              <Link to="/OfficerDashboard3">Borrower List</Link>
              <Link to="/Officerprof">Profile</Link>
          </nav>

          <div className="Logoff" onClick={handleLogout}>
              <img src="Sign_out_squre.png" alt="Logout" className="outpicoff" />
              <div className="logoutcontoff">
                  <Link to="/login" className="logoutoff">Logout</Link>
              </div>
          </div>
      </div>
      <div className="containeroff">
        <h1 className="loan-title">Loan Management System</h1>
        <Link to={`/generate`}>
           <button className="generate-report-button">Generate Report</button>
        </Link>
        
        <Stats />
        <Graphs />
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Dashboard1;
