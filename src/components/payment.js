import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './officerdashboard.css';

const Payment = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setLoggedIn(false);
    navigate('/');
  };

  // Fetch approved payments on component load
  useEffect(() => {
    const fetchApprovedPayments = async () => {
      try {
        const response = await fetch('http://localhost:3001/payments/approved');
        if (!response.ok) throw new Error('Failed to fetch approved payments');
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching approved payments:', error);
      }
    };

    fetchApprovedPayments();
  }, []);

  // Filter payments based on search term
  const filteredPayments = payments.filter(payment =>
    payment.applicantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="offdashboard">
      <header className="headeroff">
        <img src="logo.png" alt="MSU-IIT NMPC Logo" className="logooff" />
        <h2 className="landingh2off2">MSU-IIT National Multi-Purpose Cooperative</h2>
      </header>

      <div className="sidebar">
        <div className="profile">
          <img src="prof.png" alt="Profile" className="profile-pic" />
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
          <Link to="/payment">Payment</Link>
          <Link to="/Officerprof">Profile</Link>
        </nav>

        <div className="Logoff" onClick={handleLogout}>
          <img src="Sign_out_squre.png" alt="Logout" className="outpicoff" />
          <div className="logoutcontoff">
            <Link to="/logout" className="logoutoff">Logout</Link>
          </div>
        </div>
      </div>
      <div className="containeroff">
        <div className="pending-table">
          <div className="pending-header">
            <span>Payment History</span>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Payment Due Date</th>
                <th>Amount</th>
                <th>Loan Term</th>
                <th>Status</th>
                <th>Date Paid</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.applicantName}</td>
                  <td>{payment.paymentDueDate}</td>
                  <td>{payment.loanAmount}</td>
                  <td>{payment.loanTerm}</td>
                  <td>{payment.paymentStatus}</td>
                  <td>{payment.disbursementDate}</td>
                  <td><button className="view-button">View more..</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment;
