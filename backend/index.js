const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const bodyParser = require('body-parser');
const UserModel = require('./user');
const LoanModel = require('./loan');
const Cashflow = require('./cashflow');
var cors = require ('cors')

const app = express();
const port = 3001;
app.use(cors())

app.use(express.json())
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/loan',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(db=>console.log('DB is connected'))
.catch(err=> console.log(err));

app.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const user = await UserModel.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: "Login successful", userId: user._id, role: user.role });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
});

app.post('/signup', async (req, res) => {
    const { username, email, role, password } = req.body;
  
    try {

        if (!['admin', 'member'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Must be either "admin" or "member".' });
        }
        
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new UserModel({
        username,
        email,
        role,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user' });
    }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST endpoint for creating loans with embedded images
app.post('/loan', upload.fields([{ name: 'memberSig' }, { name: 'spouseSig' }]), async (req, res) => {
    const { 
        branch, applicationDate, newRe, applicantName, emailAddress,
        permanentAddress, presentAddress, telMob, age, sex, civilStatus, 
        spouseName, spouseOccu, location, loanType, loanAmount, loanTerm, 
        purposeLoan, employer, empCon, empStatus, businessName, businessAdd, 
        lengthMem, shareCapital, savingsDepo, otherDepo ,collateral, sourcePay,
        modePay, mannerPay, interestRate, disbursementDate, paymentStatus,
        defaultStatus, riskRating, approvalDate, notes,
    } = req.body;

    try {
        const { files } = req;

        // Validate required fields
        if (!branch || !applicationDate || !newRe || !applicantName) {
            return res.status(400).json({ error: 'Branch, application date, application type, and applicant name are required.' });
        }

        // Prepare image data if provided
        const memberSig = files.memberSig ? files.memberSig[0] : null;
        const spouseSig = files.spouseSig ? files.spouseSig[0] : null;

        // Create a new Loan object
        const newLoan = new LoanModel({
            branch,
            applicationDate,
            newRe,
            applicantName,
            emailAddress,
            permanentAddress,
            presentAddress,
            telMob,
            age,
            sex,
            civilStatus,
            spouseName,
            spouseOccu,
            location,
            loanType,
            loanAmount,
            loanTerm,
            purposeLoan,
            employer,
            empCon,
            empStatus,
            businessName,
            businessAdd,
            lengthMem,
            shareCapital,
            savingsDepo,
            otherDepo,
            collateral,
            sourcePay,
            modePay,
            mannerPay,
            interestRate,
            disbursementDate,
            paymentStatus,
            defaultStatus,
            riskRating,
            approvalDate,
            notes,
            memberSig: memberSig
                ? {
                      data: memberSig.buffer,
                      contentType: memberSig.mimetype,
                  }
                : undefined,
            spouseSig: spouseSig
                ? {
                      data: spouseSig.buffer,
                      contentType: spouseSig.mimetype,
                  }
                : undefined,
        });

        // Save the newLoan object to the database
        await newLoan.save();
        return res.status(201).json({ 
            _id: newLoan._id 
        });

    } catch (error) {
        console.error('Error submitting loan:', error);
        return res.status(500).json({ 
            error: 'An error occurred while processing your request.',
            details: error.message // Include error message details for debugging
        });
    }
});

app.post('/cashflow', upload.fields([{ name: 'memberBorSig' }]), async (req, res) => {
    const {
        loanId,
        totalIncome,
        totalExpenditures,
        totalCashOutlays,
        totalExpenditureAndCashOutlays,
        netSavings,
        otherOutlays,
        comaker,
        cfaplidate,
    } = req.body;
    
    try {
        const { files } = req;
        
        if (!loanId) {
            return res.status(400).json({ error: 'loanId is required to associate the cashflow with a loan.' });
        }

        // Validate required fields
        if (!totalIncome || !totalExpenditures || !totalCashOutlays || !totalExpenditureAndCashOutlays || !netSavings) {
            return res.status(400).json({ error: 'Required fields are missing.' });
        }

        const memberBorSig = files.memberBorSig ? files.memberBorSig[0] : null;

        const loanExists = await LoanModel.findById(loanId);
        if (!loanExists) {
            return res.status(404).json({ error: 'Loan with the provided ID does not exist.' });
        }

        // Prepare the cashflow object
        const newCashflow = new Cashflow({
            loanId,
            totalIncome: Number(totalIncome),
            totalExpenditures: Number(totalExpenditures),
            totalCashOutlays: Number(totalCashOutlays),
            totalExpenditureAndCashOutlays: Number(totalExpenditureAndCashOutlays),
            netSavings: Number(netSavings),
            otherOutlays,
            comaker,
            cfaplidate: cfaplidate ? new Date(cfaplidate) : undefined,
            memberBorSig: memberBorSig
                ? {
                      data: memberBorSig.buffer,
                      contentType: memberBorSig.mimetype,
                  }
                : undefined,
        });

        await newCashflow.save();

        return res.status(201).json({
            cashflow: newCashflow,
        });
    
    } catch (error) {
        console.error('Error submitting loan:', error);
        return res.status(500).json({ 
            error: 'An error occurred while processing your request.',
            details: error.message // Include error message details for debugging
        });
    }
});

app.get('/pics/:imageId', async (req, res) => {
    try {
        const { imageId } = req.params; // Get image ID from the route parameter
        const { imageType } = req.query; // Get image type from the query parameter

        // Fetch the document from MongoDB using the imageId
        const document = await ImageModel.findById(imageId);

        if (!document) {
            return res.status(404).send('Image not found');
        }

        // Determine which image to send
        let image;
        if (imageType === 'spouseSig') {
            image = document.spouseSig;
        } else {
            image = document.memberSig; // Default to memberSig
        }

        // Check if the selected image exists
        if (!image || !image.data) {
            return res.status(404).send('Selected image not found');
        }

        // Set response content type and send the image data
        res.contentType(image.contentType);
        res.send(image.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Internal server error');
    }
});


app.put('/loan/:loanId', async (req, res) => {
    const loanId = req.params.loanId;
    const updateData = req.body;

    try {
        const loan = await LoanModel.findOneAndUpdate(
            { loanId: loanId },
            updateData,
            { new: true }
        );

        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        res.status(200).json(loan);
    } catch (err) {
        console.error('Error updating loan:', err);
        res.status(500).json({ error: 'Failed to update loan' });
    }
});


app.delete('/loan/:loanId', async (req, res) => {
    const loanId = req.params.loanId;

    try {
        const loan = await LoanModel.findOneAndDelete({ loanId: loanId });

        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        res.status(200).json({ message: 'Loan deleted successfully', loan });
    } catch (err) {
        console.error('Error deleting loan:', err);
        res.status(500).json({ error: 'Failed to delete loan' });
    }
});

app.get('/loans', async (req, res) => {
    try {
        const { defaultStatus } = req.query;

        // If a defaultStatus is specified, use it as a filter; otherwise, return all loans
        const filter = defaultStatus ? { defaultStatus } : {};
        const loans = await LoanModel.find(filter);

        res.status(200).json(loans);
    } catch (err) {
        console.error('Error fetching loans:', err);
        res.status(500).json({ message: 'Failed to retrieve loans' });
    }
});

app.get('/loans/pending', async (req, res) => {
    try {
        const pendingLoans = await LoanModel.find({ defaultStatus: 'Pending' });
        res.status(200).json(pendingLoans);
    } catch (err) {
        console.error('Error fetching pending loans:', err);
        res.status(500).json({ message: 'Failed to retrieve pending loans' });
    }
});

app.get('/borrowers/approved', async (req, res) => {
    try {
        const approvedBorrowers = await LoanModel.find({ defaultStatus: 'Approved' });
        res.status(200).json(approvedBorrowers);
    } catch (err) {
        console.error('Error fetching approved borrowers:', err);
        res.status(500).json({ message: 'Failed to retrieve approved borrowers' });
    }
});

app.get('/payments/approved', async (req, res) => {
    try {
        const approvedPayments = await LoanModel.find({ defaultStatus: 'Approved' });
        res.status(200).json(approvedPayments);
    } catch (err) {
        console.error('Error fetching approved payments:', err);
        res.status(500).json({ message: 'Failed to retrieve approved payments' });
    }
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});