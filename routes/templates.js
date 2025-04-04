const express = require("express")
const _ = require("lodash")
const router = express.Router()
const { Templates, validateTemplate, validateTemplateForPut } = require("../models/templates")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

router.get("/",auth,async(req,res) =>{
    const categoryId = req.query.id
    let templates;
    try{
        if(categoryId) templates = await Templates.find({category:categoryId})
        else templates = await Templates.find({})
        res.send(templates)
    }catch(err){
        res.send(err.message)
    }
})

router.get("/:id",auth,async(req,res) =>{
    try{
        const result = await Templates.findById(req.params.id)
        res.send(result)
    }catch(err){
        res.status(404).send(err.message)
    }
})

router.post("/",[auth,admin],async(req,res)=>{
    const body = req.body
    const {error} = validateTemplate(body)
    if(error) return res.status(400).send(error.message)

    try{
        const template = await Templates.findOne({name:body.name})
        if(template) return res.status(400).send("Template with this name already exists")
        const newTemplate = new Templates(_.pick(body,["name","imageContent","textContent","category"]))
        await newTemplate.save()
        res.send(newTemplate)
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.put("/:id",[auth,admin],async(req,res) =>{
    const body = req.body
    const {error} = validateTemplateForPut(body)
    if(error) return res.status(400).send(err.message)
    try{
        const template = await Templates.findById(req.params.id)
        if (!template) return res.status(404).send("Invalid Id")
        if(body.name) template.set({name:body.name})
        if(body.imageContent) template.set({imageContent:body.imageContent})
        if(body.textContent) template.set({textContent:body.textContent})
        if(body.category) template.set({category:body.category})
        await template.save()
        return res.send(template)
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = router