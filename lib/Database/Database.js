const mongoose = require("mongoose");

let isConnected = false;

const ConnectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.CONN_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = { ConnectDB };