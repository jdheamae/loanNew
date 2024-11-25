// Stats.js
import React from 'react';
import './Stats.css';

const Stats = () => {
  return (
    <div className="stats-container">
      {/* Stats Boxes */}
      <div className="stats">
        <div className="stat-box active-loans">
          <h2>12,503</h2>
          <p>Total Active Loans</p>
        </div>
        <div className="stat-box pending-applications">
          <h2>12,503</h2>
          <p>Pending Loan Applications</p>
        </div>
        <div className="stat-box overdue-payments">
          <h2>12,503</h2>
          <p>Overdue Payments</p>
        </div>
        <div className="stat-box rejected-applications">
          <h2>12,503</h2>
          <p>Rejected Applications</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
