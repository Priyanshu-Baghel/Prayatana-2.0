const nodemailer = require("nodemailer");
require("dotenv").config();
const Complaint = require("../../models/complaint/complaintModel");

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.SMTP_MAIL, // Your email address
    pass: process.env.SMTP_PASSWORD, // Your email password or app-specific password
  },
});

// Submit a new complaint
const submitComplaint = async (req, res) => {
  try {
    const { name, email, complaintType, description } = req.body;

    const images = req.files["images"] ? req.files["images"].map((file) => file.path) : [];
    const videos = req.files["videos"] ? req.files["videos"].map((file) => file.path) : [];

    const complaint = new Complaint({
      name,
      email,
      complaintType,
      description,
      images,
      videos,
    });

    let data = await complaint.save();
    console.log(data);

    // Send email notification
    const mailOptions = {
      from: process.env.SMTP_MAIL, // Sender address
      to: email, // Receiver address (complainant's email)
      subject: "Complaint Submitted Successfully", // Subject line
      text: `Dear ${name},\n\nYour complaint regarding "${complaintType}" has been submitted successfully.\n\nDescription: ${description}\n\nThank you for reaching out to us.\n\nBest regards,\nYour Support Team`, // Plain text body
      html: `<p>Dear ${name},</p>
             <p>Your complaint regarding <strong>${complaintType}</strong> has been submitted successfully.</p>
             <p><strong>Description:</strong> ${description}</p>
             <p>Thank you for reaching out to us.</p>
             <p>Best regards,<br>Your Support Team</p>`, // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    res.status(500).json({ error: "Error submitting complaint" });
  }
};

// Get all complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Error fetching complaints" });
  }
};



module.exports = { submitComplaint, getComplaints };