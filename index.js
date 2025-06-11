const app = require('./app')
const PORT  = process.env.PORT || 8000
const DBConnect = require('./Database/Database')

DBConnect.ConnectDB()
app.listen(PORT , ()=>{
    console.log("Server is Started")
})