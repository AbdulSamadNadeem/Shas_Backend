const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.CONN_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 30000, 
      maxPoolSize: 10, 
      retryWrites: true,
      retryReads: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); 
  }
};

mongoose.connection.on('connected', () => 
  console.log('Mongoose default connection open'));

mongoose.connection.on('error', (err) => 
  console.log('Mongoose default connection error: ' + err));

mongoose.connection.on('disconnected', () => 
  console.log('Mongoose default connection disconnected'));

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectDB;