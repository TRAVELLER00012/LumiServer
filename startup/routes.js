const express = require("express")
const users = require("../routes/users")
const auth = require("../routes/auth")
const categories = require("../routes/category")
const templates = require("../routes/templates")
const projects = require("../routes/projects")

module.exports = (app) =>{
    app.use(express.json())
    app.use("/api/users",users)
    app.use("/api/auth",auth)
    app.use("/api/categories",categories)
    app.use("/api/projects",projects)
}