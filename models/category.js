const mongoose = require("mongoose")
const Joi = require("joi")

const schema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true,
        maxLength:100,
        minLength:3
    }
})

const Categories = mongoose.model("Category",schema)

function validateCategory(category){
    const schema = Joi.object({
        name:Joi.string().required().max(100).min(3)
    })
    return schema.validate(category)
}
function validateCategoryForPut(category){
    const schema = Joi.object({
        name:Joi.string().max(100).min(3)
    })
    return schema.validate(category)
}

module.exports.Categories = Categories
module.exports.validateCategory = validateCategory
module.exports.validateCategoryForPut = validateCategoryForPut