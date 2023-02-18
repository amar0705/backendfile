const { notEqual } = require("assert")
const express = require("express")
const {NoteModel} = require("../models/note.model")

const noteRouter = express.Router()

noteRouter.get("/", async(req,res)=>{
    try{
        const notes = await NoteModel.find()
        res.send(notes)
    }catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

noteRouter.post("/create", async(req,res)=>{
    const payload = req.body
    try{
        const note = new NoteModel(payload)
        await note.save()
        res.send({message:"Note Created"})
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

noteRouter.patch("/update/:id", async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    try{
        await NoteModel.findByIdAndUpdate({_id:ID},payload)
        res.send({message:`Updated the notes whose id is ${ID}`})
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

noteRouter.delete("/delete/:id", async(req,res)=>{
    const ID = req.params.id
    try{
        await NoteModel.findByIdAndDelete({_id:ID})
        res.send({message:`Deleted the notes whose id is ${ID}`})
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

module.exports = {noteRouter}
