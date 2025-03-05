const dotenv = require("dotenv");
dotenv.config();
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

console.log(process.env.SMTP_PASSWORD);
console.log(process.env.SMTP_MAIL);

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: 'gmail',
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  
  try {
      const { email, username } = req.body;
      // console.log(email, username );

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Welcome to Sahayata-Setu! 🎉',
    text: `Dear ${username},  

Thank you for joining us on Sahayata-Setu !  

We’re excited to have you as part of our community. We hope you had a great experience signing up, and we look forward to assisting you on your journey.  

If you have any questions or need support, feel free to reach out to us.  

Welcome aboard! 

Best regards,  
The Sahayata-Setu Team`,
  };
 
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
    } catch (error) {
        console.error(error);
    };
  
});

const sendEmailComplaint = expressAsyncHandler(async (req, res) => {
  
  try {
      const { email, username } = req.body;
      // console.log(email, username );

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Welcome to Sahayata-Setu! 🎉',
    text: `Dear ${username},  

Thank you for joining us on Sahayata-Setu !  

We’re excited to have you as part of our community. We hope you had a great experience signing up, and we look forward to assisting you on your journey.  

If you have any questions or need support, feel free to reach out to us.  

Welcome aboard! 

Best regards,  
The Sahayata-Setu Team`,
  };
 
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
    } catch (error) {
        console.error(error);
    };
  
});

module.exports = { sendEmail };
