const nodemailer = require("nodemailer");

const transporter =nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const sender = {
    email : "shasmedia@gmail.com",
    name : "ShasMedia Support"
} 

module.exports  = {transporter , sender}