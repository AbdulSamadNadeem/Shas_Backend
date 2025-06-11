const mongoose = require("mongoose")

exports.ConnectDB = ()=>{
    mongoose.connect(process.env.CONN_STR)
.then((data)=>{
    console.log("DB CONNECTED SUCCESSFULLY")
})
.catch((err)=>{
    console.log(err.message)
})
}