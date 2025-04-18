const express = require("express")
const bcrypt = require("bcrypt")
const _ = require("lodash")
const { Users, validateUser } = require("../models/users")
const auth = require("../middleware/auth")
const router = express.Router()

router.get("/me",auth,async (req,res) =>{
    try{
        const user = await Users.findById(req.user._id).select({password:0})
        res.send(user)
    }catch(e){
        res.status(400).send(e.message)
    }
})

router.post("/", async (req,res) =>{
    const body = req.body
    const {error} = validateUser(body)
    if(error) return res.status(400).send(error.message)
    try{
        const user = await Users.findOne({email:body.email})
        if (user) return res.status(400).send("User already exists")

        const newUser = new Users(_.pick(body,["name","email","password"]))
        const salt = await bcrypt.genSalt(10)
        newUser.password =  await bcrypt.hash(newUser.password,salt)

        await newUser.save()

        const token = newUser.generateAuthToken()
        return res.header("x-auth-token",token).send(_.pick(newUser,["_id","name","email"]))
    }catch(e){
        res.status(400).send(e.message)
    }
})

module.exports =  router