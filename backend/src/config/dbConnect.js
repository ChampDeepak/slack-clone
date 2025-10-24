import mongoose from "mongoose";
export const connectDB = async (url)=>{
    return await mongoose
            .connect(url)
            .then(()=>console.log("Connected to DB."))
            .catch((err)=> console.log("Error Connecting with DB", err))
}