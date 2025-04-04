const express = require("express")
const _ = require("lodash")
const router = express.Router()
const {Projects,validateProject, validateProjectForPut} = require("../models/projects")
const auth = require("../middleware/auth")

router.get("/",auth,async(req,res) =>{
    try{
        const projects = await Projects.find({})
        res.send(projects)
    }catch(err){
        res.send(err.message)
    }
})

router.get("/:id",auth,async(req,res) =>{
    try{
        const project = await Projects.findById(req.params.id)
        if(project)res.send(project)
        else res.status(404).send("Project Not Found")
    }catch(err){
        res.send(err.message)
    }
})

router.post("/",auth,async(req,res)=>{
    const body = req.body
    const {error} = validateProject(body)
    if(error) return res.status(400).send(error.message)
    try{
        const project = await Projects.findOne({name:body.name})
        if(project) return res.status(400).send("Project with this name already exists")
        const newProject = new Projects(_.pick(body,["name","imageContent","textContent","user","template"]))
        await newProject.save()
        res.send(newProject)
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.put("/:id",auth,async(req,res) =>{
    const body = req.body
    const {error} = validateProjectForPut(body)
    if(error) return res.status(400).send(err.message)
    try{
        const project = await Projects.findById(req.params.id)
        if (!project) return res.status(404).send("Invalid Id")
        if(body.name) project.set({name:body.name})
        if(body.imageContent) project.set({imageContent:body.imageContent})
        if(body.textContent) project.set({textContent:body.textContent})
        await project.save()
        return res.send(project)
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.delete("/:id",auth,async(req,res)=>{
    try{
        const project = await Projects.findByIdAndDelete(req.params.id)
        res.send(project)
    }catch(err){
        res.status(404).send(err.message)
    }
})

module.exports = router