import express from "express";
import conn from './config/db.js'
const app=express();

app.get("/",(req,res)=>{
    res.send("hello");
})


app.listen(5000,()=>{
    conn("AI_SCRIPT_WRITER");
    console.log("server is running on port 5000");
});