const express = require("express")
const auth = require("../routes/test")

module.exports = (app) =>{
    app.use(express.json())
    app.use("/api/test",auth)
}