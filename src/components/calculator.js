import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './calculator.css';
import BorrowerHeader from './borrowerheader';

const Calculator = () => {
  const [loanType, setLoanType] = useState('Personal');
  const [loanAmount, setLoanAmount] = useState(10000);
  const [paymentPeriod, setPaymentPeriod] = useState(1);
  const [interestRate, setInterestRate] = useState(1.7);
  const [depositMethod, setDepositMethod] = useState('Bank Transfer');
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmountPayable, setTotalAmountPayable] = useState(0);
  const loanPoints = [1000, 5000, 10000, 50000, 100000, 500000, 1000000];
  const paymentPoints = Array.from({ length: 12 }, (_, i) => (i + 1) * 10);

  // Function to calculate interest and total amount payable
  const calculateLoan = () => {
    const interest = (loanAmount * interestRate * paymentPeriod) / 100;
    const totalPayable = loanAmount + interest;
    setTotalInterest(interest);
    setTotalAmountPayable(totalPayable);
  };

  // Recalculate whenever loanAmount, paymentPeriod, or interestRate changes
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, paymentPeriod, interestRate]);

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      // Check if the user is logged in by looking for the token in localStorage
      const token = localStorage.getItem('token');
      if (token) {
          setLoggedIn(true);
      } else {
          setLoggedIn(false);
      }
  }, []);


  return (

    <div>
        <header className="calhead">        
             {loggedIn ? (
                    <>
                    <   BorrowerHeader /> 
                        
                    </>
                ) : (
                    <>
                    <Link to="/">
                        <img src="logo.png" alt="MSU-IIT NMPC Logo"  className="logol"/>
                    </Link>
                    <h2 className="landingh2q">MSU-IIT National Multi-Purpose Cooperative</h2>
                        <div className="logger">
                            <a href="/login" className="nave">Login</a>
                            <a href="/register" className="nave1">Register</a>
                        </div>
                        
                    </>
                )}
            </header>
        <div className="loan-calculator-container">  
        <h1 className="loanh1">
            How Much Would You Like <span>To Borrow?</span></h1>
        <p className="loanp1"> Calculate Your Interest Payable</p>
        <p className="subtext">Calculate the monthly interest payable on your loan.</p>
        

            <div className="loan-calculator-layout">
                {/* Left side - Loan Calculation Form */}
                <div className="loan-form">
                <div className="section">
                    <label className="section-title">Available Loan Type</label>
                    <div className="loan-type">
                    <button className={`loan-type-btn ${loanType === 'Personal' ? 'selected' : ''}`} onClick={() => setLoanType('Personal')}>Personal</button>
                    <button className={`loan-type-btn ${loanType === 'Educational' ? 'selected' : ''}`} onClick={() => setLoanType('Educational')}>Educational</button>
                    <button className={`loan-type-btn ${loanType === 'Pensioner' ? 'selected' : ''}`} onClick={() => setLoanType('Pensioner')}>Pensioner</button>
                    </div>
                </div>

                <div className="section">
                    <label className="section-title">Loan Amount</label>
                    <input
                    type="range"
                    min="1"
                    max="1000000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="slider"
                    />
                    <p className="slider-value">
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => {
                                const value = Math.min(Math.max(Number(e.target.value), 1), 1000000);
                                setLoanAmount(value);
                            }}
                            className="slider-input"
                        />
                        Pesos
                    </p>
                    
                </div>

                <div className="section">
                    <label className="section-title">Payment Period</label>
                    <input
                    type="range"
                    min="1"
                    max="120"
                    step="1"
                    value={paymentPeriod}
                    onChange={(e) => setPaymentPeriod(Number(e.target.value))}
                    className="slider"
                    />
                <p className="slider-value">
                    <input
                        type="number"
                        value={paymentPeriod}
                        onChange={(e) => {
                            const value = Math.min(Math.max(Number(e.target.value), 1), 120);
                            setPaymentPeriod(value);
                        }}
                        className="slider-input"
                    />
                    Months
                </p>
            </div>
                    
            <div className="interest-deposit-section">
                <div>
                <label>Interest Rate %</label>
                <p>{interestRate}%</p>
                </div>
                 {/* <div>
                <label>Deposit Date</label>
                <input type="date" />
                </div>*/}
            </div>
            {/*   
            <div className="section">
                <label>Deposit Method</label>
                <div className="deposit-method">
                <label>
                    <input
                    type="radio"
                    value="Bank Transfer"
                    checked={depositMethod === 'Bank Transfer'}
                    onChange={() => setDepositMethod('Bank Transfer')}
                    />
                    Deposit Bank Transfer
                </label>
                <label>
                    <input
                    type="radio"
                    value="Cash"
                    checked={depositMethod === 'Cash'}
                    onChange={() => setDepositMethod('Cash')}
                    />
                    Cash
                </label>
                </div>
            </div>*/}     

            </div>

            {/* Right side - Account Summary */}
            <div className="account-summary">
            {/* <h2>Account Balance</h2>*/}
            <p className="balance-amount">₱{loanAmount.toLocaleString()}</p>
            <div className="summary-details">
                <p className="summaryp1">Total Interest: ₱{totalInterest.toFixed(2)}</p>
                <p className="summaryp2">Total Amount Payable: ₱{totalAmountPayable.toFixed(2)}</p>
            </div>
            
        
            <div className="summary-actions">
                {/*<button className="repayment-schedule">View Repayment Schedule</button>*/}
                <button className="apply-now"
                        onClick={() => {
                            if (loggedIn) {
                                navigate('/appform');
                            } else {
                                navigate('/login'); // Redirect to login page if not logged in
                            }
                        }}
                    >
                        Apply Now!
                    </button>
            </div>
            </div>
        </div>
        </div>
    </div>        
  );
};

export default Calculator;