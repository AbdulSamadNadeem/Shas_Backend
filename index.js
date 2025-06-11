const app = require('./app')
const PORT  = process.env.PORT || 8000
const mongoose = require("mongoose");

mongoose.connect(process.env.CONN_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
       serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000, 
  connectTimeoutMS: 10000 
    })
    .then(() => {
      console.log("DB CONNECTED SUCCESSFULLY");
    })
    .catch((err) => {
           console.log(err)
      console.log("DB CONNECTION ERROR:", err.message);
    });
;
app.listen(PORT , ()=>{
    console.log("Server is Started")
})
