import express from "express"; 
import dotenv from "dotenv"
import { connectDB } from "./config/dbConnect.js";
import {clerkMiddleware} from '@clerk/express'; 
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";
const app = express();

// Middleware Calls
app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(clerkMiddleware()) //req.auth will be available in the req obj 

dotenv.config(); 
const port = process.env.port 
 
app.get('/', (req,res)=>{
    res.send("Hello World!")
}); 


const startServer = async () => 
{
  try 
  {
    await connectDB();
    if (process.env.NODE_ENV !== "production") 
    {
      app.listen(port, () => 
      
        {
        console.log(`Server is listening at http://localhost:${port}`)
      });
    }
  } catch (error) 
  {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

export default app; 