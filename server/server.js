import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";


//Initialise EXPRESS
const app = express()

//Connect to Databse
await connectDB()


//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/',(req,res) => res.send("API Working"));
app.get("/debug-sentry", function maninHandler(req,res){
    throw new Error("my first sentry error!");
});

//Port
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});