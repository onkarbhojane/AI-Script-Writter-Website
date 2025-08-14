import express from "express";
import conn from './config/db.js'
import dotenv from "dotenv";
import scriptRoutes from "./routes/scriptRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // allow sending JWT
  })
);   
app.use("/api/scripts",scriptRoutes);
app.use("/api/auth",authRoutes);


app.listen(5000,()=>{
    conn("AI_SCRIPT_WRITER");
    console.log("server is running on port 5000");
});