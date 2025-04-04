const express = require("express")
const users = require("../routes/users")
const categories = require("../routes/category")
const templates = require("../routes/templates")

module.exports = (app) =>{
    app.use(express.json())
    app.use("/api/users",users)
    app.use("/api/categories",categories)
    app.use("/api/templates",templates)
}