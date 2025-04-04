const express = require("express")
const _ = require("lodash")
const router = express.Router()
const { Categories, validateCategory, validateCategoryForPut } = require("../models/category")

router.get("/", async (req,res) =>{
    try{
        const categories = await Categories.find({})
        res.send(categories)
    }catch(err){
        res.send(err.message)
    }
})

router.get("/:id",async(req,res) =>{
    try{
        const result = await Categories.findById(req.params.id)
        res.send(result)
    }catch(err){
        res.status(404).send(err.message)
    }
})

router.post("/",async(req,res) =>{
    const body = req.body
    const {error} = validateCategory(body)
    if(error) return res.status(400).send(error.message)

    try{
        const category = await Categories.findOne({name:body.name})
        if(category) return res.status(400).send("Category with this name already exists")
        const newCategory = new Categories(_.pick(body,["name"]))
        await newCategory.save()

        return  res.send(newCategory)
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.put("/:id",async(req,res) =>{
    const body = req.body
    const {error} = validateCategoryForPut(body)
    if(error) return res.status(400).send(error.message)

    try{
        const category = await Categories.findById(req.params.id)
        if(!category) return res.status(404).send("Invalid Id")
        if(body.name) category.set({name:body.name})
        await category.save()
        return  res.send(category)
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = router