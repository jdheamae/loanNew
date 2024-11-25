import { Link } from 'react-router-dom';
import React from 'react';
const currentStep = 3; // Change this number dynamically based on the loan status (1: Submitted, 2: In Review, etc.)


const LoanStatus = () => {
  return (
    <div className="loan-status-progress">
      <h3><i className="fas fa-clock" style={{ marginRight: '8px' }}></i>Loan Application Status</h3>
      <div className="progress-container">
        <div className="progres-status">
            <div className="filler" style={{ width: '{(currentStep-1)*33.33%}' }}></div>
        </div>
        <div className={`progress-step ${currentStep >= 1 ? 'completed' : ''}`}>
          <span className="step-icon">1</span>
          <p>Submitted</p>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? 'completed' : ''}`}>
          <span className="step-icon">2</span>
          <p>In Review</p>
        </div>
        <div className={`progress-step ${currentStep >= 3 ? 'completed' : ''}`}>
          <span className="step-icon">3</span>
          <p>Approved</p>
        </div>
        <div className={`progress-step ${currentStep >= 4 ? 'completed' : ''}`}>
          <span className="step-icon">4</span>
          <p>Disbursed</p>
        </div>
        <div className={`progress-step ${currentStep >= 5 ? 'completed' : ''}`}>
          <span className="step-icon">4</span>
          <p>Loan Payment</p>
        </div>
      </div>
    </div>

  );
};

export default LoanStatus;
