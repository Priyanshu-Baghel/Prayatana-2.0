const nodemailer = require("nodemailer");
require("dotenv").config();
const Response = require('../../models/complaint/responseModel')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_MAIL, // Your email address
        pass: process.env.SMTP_PASSWORD, // App password (not your email password)
    },
});

// Function to send response email
const sendResponseEmail = async (email, name, responseText) => {
    try {
        await transporter.sendMail({
            from: `"Support Team" <${process.env.SMTP_MAIL}>`,
            to: email,
            subject: "Response to Your Complaint",
            text: `Dear ${name},\n\nWe have reviewed your complaint and here is our response:\n\n${responseText}\n\nThank you for reaching out!\n\nBest regards,\nSupport Team`,
        });
        console.log("Email sent successfully to", email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

app.post("/api/complaints/respond/:id", async (req, res) => {
    try {
        const { response } = req.body;
        const complaint = await Response.findById(req.params.id);

        if (!complaint) return res.status(404).json({ message: "Complaint not found" });

        // Update response in DB
        complaint.response = response;
        await complaint.save();

        // Send email response to user
        await sendResponseEmail(complaint.email, complaint.name, response);

        res.json({ message: "Response submitted and email sent successfully", complaint });
    } catch (error) {
        res.status(500).json({ message: "Error submitting response", error });
    }
});