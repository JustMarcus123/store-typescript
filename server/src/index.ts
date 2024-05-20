import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from "./routes/user";

const app = express();

// middleware json
app.use(express.json());
app.use(cors());

// router api
app.use('/user', userRouter);

dotenv.config();

// mongodb connection uri
const mongoURI = process.env.MONGODB_URI ;

const PORT = 3001;

mongoose.connect(mongoURI, {
   
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.log("MongoDB connection error", err);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
