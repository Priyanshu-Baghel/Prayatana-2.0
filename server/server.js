const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app =  express();
const fs = require("fs");
const path = require("path");
const nodemailer = require('nodemailer');
// Routtes
const authRoute = require("./router/Auth/authRouter");
const contactRoute = require("./router/contact/contactRouter");
const profileRoute =require('./router/Profile/profileRouter');
const emailRoute = require("./router/email/email-router");
const ConnectDb = require("./utils/db");
const AdminRoutes = require("./router/Admin/admin");
const paymentRoutes = require("./router/payment/paymentRoutes");
const subscriptionRoute = require("./router/Subscription/subscriptionRouter");
const complaintRoutes = require("./router/complaint/complaintRouter");
const organizationRoutes = require('./router/orgainzation/orgainzationRouter');
const employeeRoutes = require('./router/employee/employeeRouter');

// const BASE_URI = process.env.Base

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true
}

app.use(cors(corsOptions));
app.use(express.json());


// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Created 'uploads' directory");
}


app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/for", profileRoute);
app.use("/", emailRoute);
app.use("/api", paymentRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/Subscription", subscriptionRoute);


app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/complaints", complaintRoutes);
app.use('/api/organizations', organizationRoutes);
app.use("/api/employees", employeeRoutes);

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' for Gmail
    auth: {
       user: process.env.SMTP_MAIL, // generated ethereal user
        pass: process.env.SMTP_PASSWORD,  // Your app password (not email password)
    },
});

// Route to send acknowledgment email
app.post('/api/admin/messages/acknowledge/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the message from the database (replace this with your actual database logic)
        const message = {
            _id: id,
            email: 'muskan.d.shukla@gmail.com', // Replace with the recipient's email
            name: 'Muskan Shukla', // Replace with the recipient's name
            message: 'This is a test message.', // Replace with the actual message
        };

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Email content
        const mailOptions = {
            from: process.env.SMTP_MAIL, // Sender email address
            to: message.email, // Recipient email address
            subject: 'Acknowledgment of Your Message', // Email subject
            text: `Hello ${message.name},\n\nThank you for your message: "${message.message}".\n\nWe have received it and will get back to you soon.\n\nBest regards,\nYour Team`, // Plain text body
            html: `<p>Hello ${message.name},</p>
                   <p>Thank you for your message: <strong>"${message.message}"</strong>.</p>
                   <p>We have received it and will get back to you soon.</p>
                   <p>Best regards,<br>Your Team</p>`, // HTML body
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Acknowledgment sent successfully' });
    } catch (error) {
        console.error('Error sending acknowledgment:', error);
        res.status(500).json({ error: 'Failed to send acknowledgment' });
    }
});


app.get("/", (req,res) => {
    res.status(200).send("welcome user landing page")
});

const PORT = process.env.PORT || 8000;

ConnectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});