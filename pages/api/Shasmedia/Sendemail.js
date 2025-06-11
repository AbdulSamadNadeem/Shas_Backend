const Cors = require("cors");
const initMiddleware = require("../../../lib/Middleware/init-middleware");
const { ConnectDB } = require("../../../lib/Database/Database");
const EmailModel = require("../../../Models/Model");
const mailer = require("../../../Mailtrap/nodemailer");

const corsMiddleware = initMiddleware(
  Cors({
    origin: "*",
    methods: ["POST"],
  })
);

module.exports = async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await ConnectDB();

    const latestEmail = await EmailModel.findOne().sort({ createdAt: -1 });

    if (!latestEmail) {
      return res.status(404).json({ message: "No messages found" });
    }

    await mailer.transporter.sendMail({
      from: `${mailer.sender.name} <${mailer.sender.email}>`,
      to: process.env.Email_Receiver,
      subject: "New Message From Sha's Media Website",
      text: `From: ${latestEmail.email}\nMessage: ${latestEmail.message}`,
    });

    res.status(200).json({ message: "Email sent successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email ❌" });
  }
};
