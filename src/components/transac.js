import { Link } from 'react-router-dom';
import React,  { useState } from 'react';

const transactions = [
  { name: 'Links Bank', date: 'June 4, 2020', amount: '₱5,553,000.00', status: 'Successful' },
  { name: 'Reliance Bank', date: 'June 5, 2020', amount: '₱5,167.00', status: 'Successful' },
  { name: 'Exondo', date: 'June 5, 2020', amount: '₱5,533.00', status: 'Successful' },
  { name: 'Links Bank', date: 'June 5, 2020', amount: '₱5,553,000.00', status: 'Failed' },
  { name: 'Exondo', date: 'June 5, 2020', amount: '₱187,000.00', status: 'Successful' },
];

const TransactionHistory = () => {
  const [progressp] = useState(40);
  return (
    <div className="transaction-history">
      <div className="transactions-tableb">
        <div className="transactions-headerb">
            <span><i className="fas fa-money-bill" style={{ marginRight: '8px' }}></i> Transaction History</span>
            <div className="filters">
              <button>Monthly</button>
              <button>Weekly</button>
              <button className="active">Today</button>
            </div>
        </div> 
          <table>
            <thead className="theadb">
              <tr>
                <th>Bank Name</th>
                <th>Date/Time</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="tbodyb">
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.name}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td className={transaction.status === 'Successful' ? 'status-success' : 'status-failed'}>
                    {transaction.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     
      
      <div className="transactions-tableb">
        <div className="transactions-headerb">
            <span><i className="fas fa-calendar" style={{ marginRight: '8px' }}></i>Payment Schedule</span>
            <div style={{ textAlign: 'center' }}>
              <div className="payprogress" style={{ position: 'relative' }}>
                <div className="progressp" style={{ width: `${progressp}%` }}></div>
              </div>
              <h5 className="payh5">9/12 months paid</h5>
            </div>
        </div> 
          <table>
            <thead className="theadb">
              <tr>
                <th>Month</th>
                <th>Recommended Pay Date</th>
                <th>Amount Due</th>
                <th>Payment Channel</th>
              </tr>
            </thead>
            <tbody className="tbodyb">
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.name}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td className={transaction.status === 'Successful' ? 'status-success' : 'status-failed'}>
                    {transaction.status}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
    </div>
  );
};

export default TransactionHistory;






