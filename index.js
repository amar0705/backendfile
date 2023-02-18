const express = require("express")
const {connection} = require("./configs/db")
const {userRouter} = require("./routes/user.route")
const {noteRouter} = require("./routes/note.route")
const {authenticate} = require("./middlewares/authenticate.middleware")
require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Welcome")
})

const corsOpts = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOpts))

app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", noteRouter)

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log(err)
    }
    console.log(`Listening to port ${process.env.port}`)
})