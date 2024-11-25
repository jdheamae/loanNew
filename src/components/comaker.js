import './appform.css';
import Footer from './footer';
import React, { useState } from 'react';
import BorrowerHeader from './borrowerheader';

// Set up a custom icon for the Leaflet marker


const CoMaker = () => {

    
    return (
        <div className="application-form-pageapp1">
            {/* Header Section */}
            <BorrowerHeader/>

            {/* Form Container */}
            <div className="sulodPorm1">
            <h3 className="lontaytel1">Co-Maker's Statement</h3>
                <form className="porm1">
                    <div className="plesDet1">
                        <div className="lugar1">
                        <label for="branch">BRANCH</label>
                            <select id="branch" name="branch" required>
                                <option value="tibanga">Tibanga</option>
                                <option value="main">Main</option>
                            </select>
                        </div>

                        <div className="det1">
                            <label htmlFor="dateFiled">DATE FILED</label>
                            <input type="date" id="dateFiled" name="dateFiled" required />
                        </div>

                    </div>
                            <br></br>
                            <p className="aboutp">
                            I hereby agree to be the co-maker of member-borrower in signing the note which will evidence the loan he/she is applying for if granted. 
                            I am aware that in signing the note as co-maker, I become jointly and solidarily liable with the member-borrower.
                            I am also aware that you will rely on the truthfulness of the following statements in considering the 
                            risk relative to the requested loan of the above- named member-borrower.
                            </p>
                            <br></br>
                            <p className="aboutp">
                            As co-maker/s of this loan, I do hereby assign in favor of MSU-IIT NMPC all my deposits. Furthermore, with this note, 
                            I empower and authorize MSU-IIT NMPC  to off-set my/our deposits and apply as payment to the loan of the principal 
                            borrower including interests and penalty/ies, in the event of the principalborrowers' failure to pay the same after 
                            its maturity and without any prior notice or written demand from MSU-IIT NMPC.
                            </p>

                            <br></br>

                    <div className="isa1">

                        <div className="pormleft1">
                            <div className="fillupan1">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="email">Email Address:</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="permanentAddress">Permanent Address:</label>
                                <textarea id="permanentAddress" name="permanentAddress" required></textarea>
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="presentAddress">Present Address:</label>
                                <textarea id="presentAddress" name="presentAddress" required></textarea>
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="phone">Telephone/Mobile No.:</label>
                                <input type="text" id="phone" name="phone" required />
                            </div>

                            <div className='ubosbali'>
                                <h4>IF EMPLOYED</h4>
                                <div className="fillupan1">
                                    <label htmlFor="employerContact">Employer:</label>
                                    <input type="text" id="employerContact" name="employerContact" required />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Address</label>
                                    <input type="text" id="employmentStatus" name="employmentStatus" required />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Employment Status/Position Head</label>
                                    <input type="text" id="employmentStatus" name="employmentStatus" required />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Length of Service</label>
                                    <input type="text" id="employmentStatus" name="employmentStatus" required />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Annual Salary</label>
                                    <input type="text" id="employmentStatus" name="employmentStatus" required />
                                </div>
                            </div>
                        </div>

                        <div className="pormrayt1">
                            <div className="fillupan1">
                                <label htmlFor="presentAddress">Present Address:</label>
                                <textarea id="presentAddress" name="presentAddress" required></textarea>
                            </div>

                            <div className='gagmay'>
                            <div className="ageco">
                                <label htmlFor="age">Age:</label>
                                <input type="number" id="age" name="age" required />
                            </div>

                            <div className="genderco">
                                <label htmlFor="sex">Sex:</label>
                                <select id="sex" name="sex" required>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>

                            <div className="civilco">
                                <label htmlFor="civilStatus">Civil Status:</label>
                                <select id="civilStatus" name="civilStatus" required>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="employerContact">Name of Spouse:</label>
                                <input type="text" id="employerContact" name="employerContact" required />
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="employmentStatus">Residence Status</label>
                                <input type="text" id="employmentStatus" name="employmentStatus" required />
                            </div>

                            <div className='ubosbali2'>
                                <h4>IF SELF-EMPLOYED</h4>
                                <div className="fillupan1">
                                    <label htmlFor="employerContact">Firm/ Trade Name:</label>
                                    <input type="text" id="employerContact" name="employerContact" required />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Address</label>
                                    <input type="text" id="employmentStatus" name="employmentStatus" required />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Nature of Business</label>
                                    <input type="text" id="employmentStatus" name="employmentStatus" required />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Sole Owner/Partner</label>
                                    <input type="text" id="employmentStatus" name="employmentStatus" required />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Capital Invested</label>
                                    <input type="text" id="employmentStatus" name="employmentStatus" required />
                                </div>
                            </div>
                        </div> 
                    </div>
                                            {/* Outstanding Obligations Table */}
                    <h4 className="table-header">OUTSTANDING OBLIGATION/S, IF ANY (As Principal or Co-maker)</h4>
                    <table className="obligation-table">
                        <thead>
                            <tr>
                                <th>Creditor</th>
                                <th>Principal Amount</th>
                                <th>Present Balance</th>
                                <th>Maturity Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" name="creditor1" /></td>
                                <td><input type="text" name="principalAmount1" /></td>
                                <td><input type="text" name="presentBalance1" /></td>
                                <td><input type="date" name="maturityDate1" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="creditor2" /></td>
                                <td><input type="text" name="principalAmount2" /></td>
                                <td><input type="text" name="presentBalance2" /></td>
                                <td><input type="date" name="maturityDate2" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="creditor3" /></td>
                                <td><input type="text" name="principalAmount3" /></td>
                                <td><input type="text" name="presentBalance3" /></td>
                                <td><input type="date" name="maturityDate3" /></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* List of Properties Table */}
                    <h4 className="table-header">LIST OF PROPERTIES (REAL AND PERSONAL)</h4>
                    <table className="properties-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Area</th>
                                <th>Market Value</th>
                                <th>Encumbrances</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><textarea type="text" name="description1" /></td>
                                <td><textarea type="text" name="location1" /></td>
                                <td><input type="text" name="area1" /></td>
                                <td><input type="text" name="marketValue1" /></td>
                                <td><input type="text" name="encumbrances1" /></td>
                            </tr>
                            <tr>
                            <td><textarea type="text" name="description1" /></td>
                            <td><textarea type="text" name="location1" /></td>
                                <td><input type="text" name="area2" /></td>
                                <td><input type="text" name="marketValue2" /></td>
                                <td><input type="text" name="encumbrances2" /></td>
                            </tr>
                            <tr>
                            <td><textarea type="text" name="description1" /></td>
                            <td><textarea type="text" name="location1" /></td>
                                <td><input type="text" name="area3" /></td>
                                <td><input type="text" name="marketValue3" /></td>
                                <td><input type="text" name="encumbrances3" /></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Additional Information */}
                    <div className="additional-info">
                        <div>
                            <label htmlFor="relationship">What is your relationship to the Member-borrower?</label>
                            <input type="text" id="relationship" name="relationship" />
                        </div>
                        <div>
                            <label htmlFor="yearsKnown">How many years have you known the Member-borrower?</label>
                            <input type="number" id="yearsKnown" name="yearsKnown" />
                        </div>
                    </div>

                            <p className="aboutp">
                            The undersigned authorized MSU-IIT NMPC to obtain such information as it may 
                            require concerning this application and agree that this document shall remain 
                            its property whether or not the loan is granted. The undersigned hereby 
                            certifies that the information stated is true and correct and agrees to 
                            notify the company of any material change affecting any loan based on the 
                            information contained herein.
                            </p>
                            <br></br>
                            {/* Upload Signature and Date */}

{/* Share Residence Location */}

                                    

                    <div className="form-row-checkbox-upload-date">
                        <div className="upload-field">
                            <label htmlFor="coMakerSignature" className="upload-label">Co-maker's Name under Signature</label>
                            <input type="file" id="coMakerSignature" name="coMakerSignature" />
                        </div>

                        <div className="date-field">
                            <label htmlFor="dateField">Date</label>
                            <input type="date" id="dateField" name="dateField" />
                        </div>
                    </div>

                           

                            <div class="parent-containerapp1">
                                <a href="/appform" class="submit-btn">Next →</a>
                            </div>


                        </form>
                    </div>

         <Footer />
        </div>
    );
};

export default CoMaker;
