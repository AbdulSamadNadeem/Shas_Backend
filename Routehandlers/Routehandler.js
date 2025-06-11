const mailer = require("../Mailtrap/nodemailer");
const EmailModel = require("../Models/Model");

exports.storemessages = async (req, res) => {
  try {
    const { email, message, name, phone } = req.body;

    if (!email || !message || !phone || !name) {
      return res.status(400).send("Invalid Credentials");
    }

    const saveEmail = new EmailModel({
      email,
      message,
      phone,
      name,
    });

    await saveEmail.save();

    res.status(201).send("Message stored successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error storing message.");
  }
};

exports.sendemail = async (req, res) => {
  try {
    const latestEmail = await EmailModel.findOne().sort({ createdAt: -1 });

    if (!latestEmail) {
      return res.status(404).send("No messages found.");
    }

    console.log(latestEmail);

    await mailer.transporter.sendMail({
      from: `${mailer.sender.name} <${mailer.sender.email}>`,
      to: process.env.Email_Receiver,
      subject: "New Message From Sha's Media Website",
      text: `From: ${latestEmail.email} \n Message: ${latestEmail.message}`,
    });

    res.status(200).send("Email sent successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email.");
  }
};
