const express = require("express")
const dotenv = require("dotenv")
dotenv.config({path:"./config.env"})
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Router = require("./Routes/Routes")


app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/api/shasmedia" , Router)
module.exports = app