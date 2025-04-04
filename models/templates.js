const mongoose = require("mongoose")
const Joi = require("joi")
const { Categories } = require("./category")

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
    category:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Category",
        required:true,
        validate:{
            validator: async function(value){
                const category = await Categories.findById(value)
                return category != null
            },
            message:"Category doesn't exist"
        }
    }
})

const Templates = mongoose.model("Template",schema)

function validateTemplate(template){
    const schema = Joi.object({
        name : Joi.string().required().max(100).min(3),
        imageContent: Joi.array().items(Joi.object()),
        textContent: Joi.array().items(Joi.object()),
        category:Joi.objectId().required()
    })
    return schema.validate(template)
}

function validateTemplateForPut(template){
    const schema = Joi.object({
        name : Joi.string().max(100).min(3),
        imageContent: Joi.array().items(Joi.object()),
        textContent: Joi.array().items(Joi.object()),
        category:Joi.objectId()
    })
    return schema.validate(template)
}

module.exports.Templates = Templates
module.exports.validateTemplate = validateTemplate
module.exports.validateTemplateForPut = validateTemplateForPut