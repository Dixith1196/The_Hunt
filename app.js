const path = require("path")
const express = require ("express")
const app = express()


app.get("/",(req,res)=>{
    res.send("Hello World!!")
})

app.listen(3000, () =>{
    console.log("The server is running on the port 3000")
})