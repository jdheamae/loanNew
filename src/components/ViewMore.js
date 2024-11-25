import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ViewMore.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ViewMorePage = () => {
  const navigate = useNavigate();
  const borrower = {
    fullName: "John Doe",
    dob: "1990-01-01",
    contactNumber: "123-456-7890",
    email: "johndoe@example.com",
    address: "123 Main Street",
    occupation: "Software Engineer",
    employer: "TechCorp",
    loanDetails: {
      loanId: "L001",
      loanType: "Personal Loan",
      applicationDate: "2023-01-01",
      loanStatus: "Active",
      loanAmount: 5000,
      interestRate: 5,
      loanTerm: 12,
      monthlyPayment: 450,
    },
    repayments: [
      { date: "2023-02-01", amount: 450, status: "Late" },
      { date: "2023-03-01", amount: 450, status: "On-time" },
    ],
    documents: {
      loanAgreement: "Agreement_001.pdf",
      collateral: "Collateral_001.pdf",
    },
  };

  const handleBack = () => {
    navigate('/officerdashboard3'); 
};

// PDF Download Function
const overviewRef = useRef(null);
const handleDownloadPDF = async () => {
 if (!overviewRef.current) {
   console.error("Element not attached to the DOM.");
   return;
 }

 try {
   const canvas = await html2canvas(overviewRef.current, { scale: 2 });
   const imgData = canvas.toDataURL('image/png');
   
   // Set up PDF dimensions
   const pdf = new jsPDF('p', 'mm', [215.9,  355.6]); // Adjust for long paper size
   const imgWidth = pdf.internal.pageSize.getWidth();
   const imgHeight = (canvas.height * imgWidth) / canvas.width;
   
   let position = 0; // To track the vertical position
   const pageHeight = pdf.internal.pageSize.getHeight(); // Height of one page in PDF
   
   // Loop through canvas and create pages if the content exceeds one page
   while (position < imgHeight) {
     pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight); // Y position set to -position
     position += pageHeight; // Move down by one page height

     // Add a new page if there's still content left to add
     if (position < imgHeight) {
       pdf.addPage();
     }
   }
   
   pdf.save('Borrower_Information 1/2.pdf');
 } catch (error) {
   console.error("Error generating PDF:", error);
 }
};

const [currentDateTime, setCurrentDateTime] = useState(new Date());

 useEffect(() => {
   // Update date and time every second
   const timer = setInterval(() => {
     setCurrentDateTime(new Date());
   }, 1000);

   // Clear timer on component unmount
   return () => clearInterval(timer);
 }, []);

 // Format date and time
 const formattedDate = currentDateTime.toLocaleDateString();
 const formattedTime = currentDateTime.toLocaleTimeString();
  return (
    <div className="pdf-container">
      <header className="headeroff">
          <img src="logo.png" alt="MSU-IIT NMPC Logo" className="logooff"/>
          <h2 className="landingh2off">MSU-IIT National Multi-Purpose Cooperative</h2>
      </header>
        <button className="back-btn1" onClick={handleBack}>Back</button>
        <button className="printDownload1" onClick={handleDownloadPDF}>Download</button>
       
      <br/>
      <div ref={overviewRef} id="overviewRef"><br/>
        <div className="headerview">
          <h1>Borrower Information</h1>
          <p>Loan Application and Transaction Summary</p>
          <h5>Date: {formattedDate} Time: {formattedTime}</h5>
        </div> <br/>

        <div className="section">
          <h2>Borrower Profile</h2>
          <div className="section-content1">
            <div class="profile-column">
              <p><strong>Member ID:</strong> {borrower.fullName}</p>
              <p><strong>Full Name:</strong> {borrower.fullName}</p>
              <p><strong>Contact Number:</strong> {borrower.contactNumber}</p>
              <p><strong>Email Address:</strong> {borrower.email}</p>
              <p><strong>Permanent Address:</strong> {borrower.email}</p>
              <p><strong>Present Address:</strong> {borrower.email}</p>
              <p><strong>Contact/Telephone Number:</strong> {borrower.contactNumber}</p>
              <p><strong>Sex:</strong> {borrower.contactNumber}</p>
              <p><strong>Age:</strong> {borrower.email}</p>
              <p><strong>Civil Status:</strong> {borrower.dob}</p>
              <p><strong>Name of Spouse:</strong> {borrower.contactNumber}</p>
              <p><strong>Spouse Occupation:</strong> {borrower.email}</p>
              <p><strong>Valid ID/#:</strong> ${borrower.loanDetails.loanAmount}</p>
            </div>
            <div class="profile-column">
              <p><strong>Employer:</strong> {borrower.contactNumber}</p>
              <p><strong>Employer Contact Number:</strong> {borrower.email}</p>
              <p><strong>Employement Status/Position Held:</strong> {borrower.email}</p>
              <p><strong>Business Name:</strong> {borrower.email}</p>
              <p><strong>Business Address:</strong> {borrower.contactNumber}</p>
              <p><strong>Length of Coop Membership:</strong> {borrower.contactNumber}</p>
              <p><strong>Account Balance:</strong> {borrower.email}</p>
                <ul>
                  <li><p><strong>Share Capital:</strong> {borrower.dob}</p></li>
                  <li><p><strong>Savings Deposit:</strong> {borrower.dob}</p></li>
                  <li><p><strong>Other Deposit:</strong> {borrower.dob}</p></li>
                </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Cash Flow Statement</h2>
          <div className="section-content">
          <table className="cash-flow-table">
            <tbody>
              <tr>
                <td>Salaries and Wages</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Spouse Income</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Income from Business (Net)</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Income from Financial Investment/Dividend</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Other Income</td>
                <td>{borrower.loanDetails.loanType}</td>
              </tr>
              <tr>
                <td><strong>Total Income</strong></td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
            </tbody>
          </table><br/>
          <h5>Expenditure and Cash Outlays</h5>  
          <table className="cash-flow-table">
            <tbody>
              <tr>
                <td>Food Expenses</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>House Rentals</td>
                <td>{borrower.loanDetails.applicationDate}</td>
              </tr>
              <tr>
                <td>Educational</td>
                <td>{borrower.loanDetails.loanStatus}</td>
              </tr>
              <tr>
                <td>Medical and Dental</td>
                <td>${borrower.loanDetails.loanAmount}</td>
              </tr>
              <tr>
                <td>Clothing</td>
                <td>{borrower.loanDetails.interestRate}%</td>
              </tr>
              <tr>
                <td>Personal Hygiene</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td>Cooking/Gas</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td>Transportation</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td>Water Bill Payment</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td>Electricity Bill Payment</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td>Telephone/Mobile/Internet Bill Payment</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td>Salary of Helper</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td>Taxes and Licenses</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td>Other Expenses</td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
              <tr>
                <td><strong>Total Expenditures</strong></td>
                <td>${borrower.loanDetails.monthlyPayment}</td>
              </tr>
            </tbody>
          </table>  <br />
          <h5>Cash Outlays</h5>  
          <table className="cash-flow-table">
            <tbody>
              <tr>
                <td>Payment of other debts/amortization</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Productive loan from other banks/coop</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Housing Amortization</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Vehicle Amortization</td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Appliances Amortization</td>
                <td>{borrower.loanDetails.loanType}</td>
              </tr>
              <tr>
                <td><strong>Others</strong></td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>Payment of Insurance or Pension Premium</td>
                <td>{borrower.loanDetails.loanType}</td>
              </tr>
              <tr>
                <td><strong>Other Cash Outlays</strong></td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>TOTAL CASH OUTLAYS</td>
                <td>{borrower.loanDetails.loanType}</td>
              </tr>
              <tr>
                <td><strong>TOTAL EXPENDITURE AND CASH OUTLAYS</strong></td>
                <td>{borrower.loanDetails.loanId}</td>
              </tr>
              <tr>
                <td>NET SAVINGS</td>
                <td>{borrower.loanDetails.loanType}</td>
              </tr>
    
            </tbody>
          </table><br/>
          </div>
        </div>
      </div>
      <div class="parent-container12">
          <a href="/viewmorepage" class="next-btn">Next →</a>
      </div>

      <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo1">
                    <h3>MSU-IIT NMPC</h3>
                    <img src="nmpc_logo1.jpg" alt="MSU-IIT NMPC Logo" className="logofooter1"/>
                </div>
                       
                        <ul className="footerUl">
                        <p>CONTACT US</p>
                            <li>Head Office: Gregorio T. Lluch Sr. Ave., Pala-o Iligan City, 9200, Philippines</li>
                            <li>Tel. No.: (063) 223-5874</li>
                            <li>Email: msuiitnmpc@msuiitcoop.org</li>
                            <li className="social-icons">
                                <img src="tw.png" alt="Twitter"/>
                                <img src="fb.png" alt="Facebook"/>
                                <img src="ig.png" alt="Instagram"/>
                            </li>
                        </ul>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2024 MSU-IIT National Multi-Purpose Cooperative. All rights reserved.
                    <a href="#terms">Terms and Condition</a>
                    <a href="#privacy">Privacy Policy</a></p>
            </div>
        </footer>
    </div>
  );
};

export default ViewMorePage;