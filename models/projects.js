const mongoose = require("mongoose")
const Joi = require("joi")
const { Users } = require("./users")
const { Templates } = require("./templates")

const schema = new mongoose.Schema({
    name: {
        type:String,
        unique:true,
        required:true,
        maxLength:100,
        minLength:3
    },
    imageContent:[{
        type:Object,
        required:false,
        default:[]
    }],
    textContent:[{
        type:Object,
        required:false,
        default:[]
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required:true,
        validate:{
            validator: async function(value){
                const user = await Users.findById(value)
                return user != null
            },
            message:"User doesn't exist"
        }
    },
    template:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Template",
        required:true,
        validate:{
            validator: async function(value){
                const template = await Templates.findById(value)
                return template != null
            },
            message:"Template doesn't exist"
        }
    }
})

const Projects = mongoose.model("Project",schema)

function validateProject(project){
    const schema = Joi.object({
        name : Joi.string().required().max(100).min(3),
        imageContent: Joi.array().items(Joi.object()),
        textContent: Joi.array().items(Joi.object()),
        user:Joi.objectId().required(),
        template:Joi.objectId().required()
    })
    return schema.validate(project)
}

function validateProjectForPut(project){
    const schema = Joi.object({
        name : Joi.string().max(100).min(3),
        imageContent: Joi.array().items(Joi.object()),
        textContent: Joi.array().items(Joi.object()),
        user:Joi.objectId(),
        template:Joi.objectId()
    })
    return schema.validate(project)
}

module.exports.Projects = Projects
module.exports.validateProject = validateProject
module.exports.validateProjectForPut = validateProjectForPut