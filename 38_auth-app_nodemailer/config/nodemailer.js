const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com", // replace with your email
    pass: "your_app_password"     // use an App Password (not your main password)
  },
});

module.exports = transporter;
