import express from "express"; 
import "../instrument.mjs"
import dotenv from "dotenv"
import { connectDB } from "./config/dbConnect.js";
import {clerkMiddleware} from '@clerk/express'; 
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";
import { chatRoutes } from "./routes/chat.route.js";
import * as Sentry from "@sentry/node"; 
const app = express();

// Middleware Calls
app.use(express.json());
app.use(clerkMiddleware()) //req.auth will be available in the req obj 


//Route Middleware Registeration 
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);


dotenv.config(); 
const port = process.env.port 
 
app.get('/', (req,res)=>{
    res.send("Hello World!")
}); 

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);
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