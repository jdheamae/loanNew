import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './quizresult.css';
import Footer from './footer';
import BorrowerHeader from './borrowerheader';

const QuizResult = () => {
    const [selectedLoan, setSelectedLoan] = useState(null);
    const navigate = useNavigate();

    const loanDetails = {
        educational: {
            title: "Educational Loan",
            description: (
                <div className="loan-info-container">
                 <p>
                 The MSU-IIT National Multi-Purpose Cooperative (NMPC) offers an Educational Loan 
                 designed to support students in achieving their academic goals. 
                 This loan provides financial assistance to cover tuition fees, 
                 school supplies, and other educational expenses, 
                 making it easier for students to focus on their studies without the financial burden.
                </p>
                <p>Educational loan can be used for almost anything, such as:</p>
                <ul>
                     <li>Loan Amount: Up to ₱50,000 </li>
                     <li>Covers tuition fees</li>
                     <li>School supplies</li>
                     <li>Other educational needs</li>
                </ul>
                </div>
            ),
            imgSrc: "educ.jpg",
        },
        personal: {
            title: "Personal Loan",
            description: (
                <div className="loan-info-container">
                 <p>
                     This personal loan allows individuals to borrow up to ₱10,000 to help achieve
                      their personal goals, whether it's for home expenses, emergencies, or other personal needs. 
                      The loan comes with a low interest rate and is payable over a 6-month period, 
                      making it more manageable for borrowers.
                </p>
                <p>A personal loan can be used for almost anything, such as:</p>
                <ul>
                     <li>Debt consolidation (paying off multiple debts)</li>
                     <li>Medical expenses</li>
                     <li>Home improvements</li>
                     <li>Wedding expenses</li>
                     <li>Travel</li>
                     <li>Emergency costs</li>
                </ul>
                </div>
            ),
            imgSrc: "personal.jpg",
        },
        pensioner: {
            title: "Pensioner Loan",
            description: "Information about the Pensioner Loan...",description: (
                <div className="loan-info-container">
                 <p>
                 Provide financial support to pensioners who
                  need assistance with their medical, living,
                   or other essential expenses. This loan is 
                   tailored to ensure that senior citizens can 
                   enjoy a comfortable and secure lifestyle by 
                   giving them access to funds when needed most.
                </p>
                <p>Educational loan can be used for almost anything, such as:</p>
                <ul>
                     <li>Loan Amount: Up to ₱20,000 </li>
                     <li>Medical expenses</li>
                     <li>Home improvements</li>
                     <li>Emergency cost</li>
                     <li>Daily living needs</li>
                </ul>
                </div>
            ),
            imgSrc: "pens.jpg",
        },
    };

    const openPopup = (loanType) => {
        setSelectedLoan(loanDetails[loanType]);
    };

    const closePopup = () => {
        setSelectedLoan(null);
    };

    const handleTakeQuizAgain = () => {
        navigate('/prequiz');
    };

    return (
        <div className="quiz-result">
            <BorrowerHeader /> 


            <div className="congrats-banner">
                <img src="cong.png" alt="Educational Loan" className="congrats-image" />
            </div>

            <div className="main-container">
                <div className="result-container">
                    <p className="greeting">Dear Charles Deo,</p>
                    <p className="qualification-message">
                        Congratulations! You’re qualified for a personal loan.
                    </p>
                    <button className="apply-loan-button">Apply personal loan</button>

                    <h3>Here’s some loan offers you can avail to:</h3>

                    <div className="loan-offers">
                        {/* Educational Loan Card */}
                        <div className="loan-card educational-card" onClick={() => openPopup('educational')}>
                            <img src="educ.jpg" alt="Educational Loan" className="loan-image" />
                            <h4>Educational Loan</h4>
                        </div>

                        {/* Personal Loan Card 
                                <button onClick={() => navigate('/appform')}>Apply now</button>
                        */}
                        <div className="loan-card personal-card" onClick={() => openPopup('personal')}>
                            <img src="personal.jpg" alt="Personal Loan" className="loan-image" />
                            <h4>Personal Loan</h4>
                        </div>

                        {/* Pensioner Loan Card */}
                        <div className="loan-card pensioner-card" onClick={() => openPopup('pensioner')}>
                            <img src="pens.jpg" alt="Pensioner Loan" className="loan-image" />
                            <h4>Pensioner Loan</h4>
                        </div>
                    </div>

                    <div className="button-container">
                        <button className="quiz-again-button" onClick={handleTakeQuizAgain}>
                            Take Quiz Again
                        </button>
                    </div>
                </div>
            </div>

            {selectedLoan && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closePopup}>X</button>

                        <div className="popup-info">
                            <h3>{selectedLoan.title}</h3>
                            <div className="loan-container">
                                <p className="loan-info">
                                    {selectedLoan.description || "Details about this loan are not available."}
                                </p>
                            </div>
                        </div>

                        <div className="popup-image-container">
                            <img src={selectedLoan.imgSrc} alt={selectedLoan.title} className="popup-image" />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default QuizResult;
