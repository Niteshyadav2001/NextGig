import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webHooks.js'


// initiaze express
const app = express()


// connect to database
await connectDB()


// middlewares
app.use(cors())
app.use(express.json())


// Routes
app.get('/',(req,res) => res.send("API working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)



// port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);


const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT,()=>{
      console.log(`Server is running on ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer()
