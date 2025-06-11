const app = require('./app')
const PORT  = process.env.PORT || 8000
const connectDB = require("./Database/Db")
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});