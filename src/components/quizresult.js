import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './quizresult.css';
import Footer from './footer';
import BorrowerHeader from './borrowerheader';

const QuizResult = () => {
    const [selectedLoan, setSelectedLoan] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { loanType, formData } = location.state || {};
    const loan = loanType ? loanDetails[loanType] : null;

    const handleTakeQuizAgain = () => {
        navigate('/prequiz');
    };

    const loanDetails = {
        educational: {
            title: "Educational Loan",
            description: (
                <div className="loan-info-container">
                    <p>
                        The MSU-IIT National Multi-Purpose Cooperative (NMPC) offers an Educational Loan 
                        designed to support students in achieving their academic goals. 
                    </p>
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
                    <p>This personal loan allows individuals to borrow up to ₱10,000 for personal needs.</p>
                    <ul>
                        <li>Debt consolidation</li>
                        <li>Medical expenses</li>
                        <li>Home improvements</li>
                    </ul>
                </div>
            ),
            imgSrc: "personal.jpg",
        },
        pensioner: {
            title: "Pensioner Loan",
            description: (
                <div className="loan-info-container">
                    <p>Provide financial support to pensioners for essential expenses.</p>
                    <ul>
                        <li>Loan Amount: Up to ₱20,000 </li>
                        <li>Medical expenses</li>
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

    return (
        <div className="quiz-result">
            <BorrowerHeader />

            <div className="congrats-banner">
                <img src="cong.png" alt="Educational Loan" className="congrats-image" />
            </div>

            <div className="main-container">
                <div className="result-container">
                    <p className="greeting">Dear Charles Deo,</p>
                    <p className="greeting">Congratulations!</p>
                    {loanType ? (
                        <>
                            <p className="qualification-message">
                                Based on your input, you qualify for a {loan.title}.
                            </p>
                            <button className="apply-loan-button">Apply for {loanType.title}</button>
                        </>
                    ) : (
                        <p className="qualification-message">
                            Unfortunately, you do not qualify for any loan at this time.
                        </p>
                    )}

                    <h3>Here’s some loan offers you can avail to:</h3>

                    <div className="loan-offers">
                        <div className="loan-card educational-card" onClick={() => openPopup('educational')}>
                            <img src="educ.jpg" alt="Educational Loan" className="loan-image" />
                            <h4>Educational Loan</h4>
                        </div>

                        <div className="loan-card personal-card" onClick={() => openPopup('personal')}>
                            <img src="personal.jpg" alt="Personal Loan" className="loan-image" />
                            <h4>Personal Loan</h4>
                        </div>

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
                            {selectedLoan.description}
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
