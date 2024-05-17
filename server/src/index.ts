import express from "express";
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'


const app = express();

dotenv.config();

const mongoURI = process.env.MONGODB_URI;


const PORT =3001;


mongoose.connect(mongoURI,{
   
}).then(()=>{
    console.log("mongodb connected successful");
}).catch((err)=>{
console.log("mongodb connection error", err);
})
app.listen(PORT, ()=>{
    console.log(`server running on port:${PORT}`)
})

