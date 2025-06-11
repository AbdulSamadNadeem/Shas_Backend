const express = require('express')
const Router = express.Router()

const Routehandlers = require("../Routehandlers/Routehandler")

Router.route("/storeemail").post(Routehandlers.storemessages)
Router.route("/sendemail").post(Routehandlers.sendemail)

module.exports = Router