import React, { useEffect, useState } from 'react';
import './prequiz.css'; // This file will contain the necessary CSS
import Footer from './footer';
import { Link, useNavigate } from 'react-router-dom';
import BorrowerHeader from './borrowerheader';


const PreQuiz = () => {
    useEffect(() => {
        // Scroll to top when the component is mounted
        window.scrollTo(0, 0);
    }, []);


    const [formData, setFormData] = useState({
        monthlyIncome: '',
        loanAmount: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const { loanAmount } = formData;

        let loanType = '';
        if (loanAmount <= 10000) {
            loanType = 'personal';
        } else if (loanAmount <= 50000) {
            loanType = 'educational';
        } else if (loanAmount <= 200000) {
            loanType = 'pensioner';
        } else {
            alert('Requested loan amount exceeds maximum limit.');
            return;
        }

        navigate('/quizresult', { state: { loanType, formData } });
    };

    return (
        <div className="applicationquiz">
            <   BorrowerHeader /> 


            {/* Form Container */}
            <div className="sulodPormquiz">
                <h3 className="titlequiz">Pre Approval Quiz</h3>
                <form className="quizpre">
                    <div className="quizsection">
                        <p>Personal Information</p>
                        <div className="itemquiz">
                            <label>First Name:</label>
                            <input type="text" />
                        </div>
                        <div className="itemquiz">
                            <label>Middle Name:</label>
                            <input type="text" />
                        </div>
                        <div className="itemquiz">
                            <label>Last Name:</label>
                            <input type="text" />
                        </div>
                        <div className="itemquiz">
                            <label>Birth Date:</label>
                            <input type="date" />
                        </div>
                        <div className="itemquiz">
                            <label>Age:</label>
                            <input type="number" />
                        </div>
                        <div className="itemquiz">
                            <label>Mobile Number:</label>
                            <input type="tel" />
                        </div>
                        <div className="itemquiz">
                            <label>Email Address:</label>
                            <input type="email" />
                        </div>
                        <div className="itemquiz">
                            <label>Residential Status:</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="quizsection">
                        <p>Employment Information</p>
                        <div className="itemquiz">
                            <label>Job Title:</label>
                            <input type="text" />
                        </div>
                        <div className="itemquiz">
                            <label>Employer Name:</label>
                            <input type="text" />
                        </div>
                        <div className="itemquiz">
                        <label>Monthly Income</label>
                        <input
                                type="number"
                                name="monthlyIncome"
                                value={formData.monthlyIncome}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="quizsection">
                        <p>Financial Information</p>
                        <div className="itemquiz">
                        <label>Loan Amount Requested:</label>
                            <input
                                type="number"
                                name="loanAmount"
                                value={formData.loanAmount}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="itemquiz">
                            <label>Loan Purpose:</label>
                            <input type="text" />
                        </div>
                    </div>
                    
                    <div className="parent-containerapp">
                        <a href="/quizresult" className="submit-btn">Next →</a>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default PreQuiz;
