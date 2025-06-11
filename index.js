const app = require('./app')
const PORT  = process.env.PORT || 8000
const mongoose = require("mongoose");

mongoose.connect(process.env.CONN_STR)
    .then(() => {
      console.log("DB CONNECTED SUCCESSFULLY");
    })
    .catch((err) => {
      console.log(err)
      console.log("DB CONNECTION ERROR:");
    });
;
app.listen(PORT , ()=>{
    console.log("Server is Started")
})
