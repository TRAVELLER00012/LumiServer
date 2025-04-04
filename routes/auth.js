const express = require("express")
const bcrypt = require("bcrypt")
const Joi = require("joi")
const router = express.Router()
const {Users} = require("../models/users");

router.post("/",async(req,res)=>{
    const body = req.body
    const {error} = validate(body)
    if(error) return res.status(400).send(error.message)

    try{
        const user = await Users.findOne({email:body.email})
        if(!user) return res.status(400).send("Invalid email or password")
        
        const isValidPassword = await bcrypt.compare(body.password,user.password)
        if(!isValidPassword) return res.status(400).send("Invalid email or password")
        
        const token = user.generateAuthToken()
        res.send(token)
    }catch(err){
        res.status(400).send(err.message)
    }
})

function validate(req){
    const schema = Joi.object({
        email: Joi.string().required().max(255).min(5).email(),
        password: Joi.string().required().max(100).min(8),
    })
    return schema.validate(req)
}

module.exports =  router