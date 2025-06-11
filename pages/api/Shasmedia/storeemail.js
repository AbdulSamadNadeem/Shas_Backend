const Cors = require("cors");
const initMiddleware = require("../../../lib/Middleware/init-middleware");
const { ConnectDB } = require("../../../lib/Database/Database");
const EmailModel = require("../../../Models/Model");

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

    const { email, message, name, phone } = req.body;

    if (!email || !message || !phone || !name) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const saveEmail = new EmailModel({ email, message, phone, name });
    await saveEmail.save();

    res.status(201).json({ message: "Message stored successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error storing message ❌" });
  }
};
