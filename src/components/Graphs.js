import React, { useState, useEffect } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import './Graphs.css';

const Graphs = () => {
  const [loanStatusData, setLoanStatusData] = useState([]);
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  // Fetch and process data for all graphs
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/loans');
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transactions');
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, []);
  

  // Loan Application Status Data
  const loanStatusChartData = {
    labels: ["Approved", "Pending", "Rejected", "Under Review"],
    datasets: [
      {
        label:["Approved", "Pending", "Rejected", "Under Review"],
        data: transactions.paymentStatus,
        backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
      },
    ],
  };

  // Payment Transactions Data
  const paymentHistoryChartData = {
    labels: paymentHistoryData.map((item) => item.date), // Assuming dates are formatted
    datasets: [
      {
        label: "Total Payments",
        data: paymentHistoryData.map((item) => item.total),
        borderColor: "#4caf50",
        fill: false,
      },
      {
        label: "Late Payments",
        data: paymentHistoryData.map((item) => item.late),
        borderColor: "#f44336",
        fill: false,
      },
      {
        label: "Upcoming Payments",
        data: paymentHistoryData.map((item) => item.upcoming),
        borderColor: "#ff9800",
        fill: false,
      },
    ],
  };

  // Loan Portfolio Breakdown Data
  const loanPortfolioChartData = {
    labels: portfolioData.map((item) => item.type),
    datasets: [
      {
        data: portfolioData.map((item) => item.amount),
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
      },
    ],
  };

  return (
    <div className="graphs">
      {/* Loan Application Status 
      <div className="large-graph">
        <h3>Loan Application Status Overview</h3>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <Bar data={loanStatusChartData} />
      </div>*/}

      {/* Payment Transactions and Portfolio Breakdown */}
      <div className="small-graphs">
        <div className="small-graph">
          <h3>Payment Transactions History</h3>
          <Line data={paymentHistoryChartData} />
        </div>
        <div className="small-graph">
          <h3>Loan Portfolio Breakdown</h3>
          <Doughnut data={loanPortfolioChartData} />
        </div>
      </div>
    </div>
  );
};

export default Graphs;
