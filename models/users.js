const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxLength:100,
        minLength: 3
    },
    email:{
        type:String,
        required: true,
        maxLength: 255,
        minLength: 5,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxLength: 100,
        minLength:8
    },
    isAdmin:{
        type:Boolean,
        required:false,
        default:false
    }
})

schema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id, isAdmin: this.isAdmin},process.env.lumi_jwtPrivateKey)
}

const Users = mongoose.model("User",schema)

function validate(user){
    const schema = Joi.object({
        name: Joi.string().required().max(100).min(3),
        email: Joi.string().required().max(255).min(5).email(),
        password: Joi.string().required().max(100).min(8),
        isAdmin: Joi.boolean()
    })
    return schema.validate(user)
}

module.exports.Users = Users
module.exports.validateUser = validate