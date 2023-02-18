const express = require("express")
const {UserModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { resolveSoa } = require("dns")

const userRouter = express.Router()

userRouter.post("/register", async(req,res)=>{
    const { name, email, pass } = req.body
    try{
        bcrypt.hash(pass,5, async(err,hash)=>{
            if(err){
                res.send({message:"Something went wrong", error:err.message})
            }
            else{
                const user = new UserModel({ name, email, pass:hash })
                await user.save()
                res.send({message:"User registered"})
            }
        })
    }catch(err){
        res.send({message:"Something went wrong"})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email, pass} = req.body
    try{
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err,result)=>{
                if(result){
                    let token = jwt.sign({userID: user[0]._id}, "masai")
                    res.send({message:"User Logged In", token: token})
                }
                else{
                    res.send({message:"Soemthing went wrong"})
                }
            })
        }
        else{
            res.send({message:"Wrong Credentials"})
        }
    }catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})


module.exports = {userRouter}
