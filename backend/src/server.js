import express from "express"; 
import dotenv from "dotenv"
import { connectDB } from "./config/dbConnect.js";

dotenv.config(); 
const port = process.env.port 
const app = express(); 
app.get('/', (req,res)=>{
    res.send("Hello World!")
}); 
connectDB(process.env.dburl)
app.listen(port, ()=>
console.log(`Server is listening at http://localhost:${port}`))