import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async ()=>{
    return await mongoose
            .connect(process.env.dburl)
            .then(()=>console.log("Connected to DB."))
            .catch((err)=> console.log("Error Connecting with DB", err))
}