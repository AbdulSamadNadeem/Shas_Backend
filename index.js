const app = require("./app");
const connectDB = require("./Database/Db");
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {

    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`➡️ Try http://localhost:${PORT}/api/health`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1); 
  }
};

startServer();


module.exports = app;