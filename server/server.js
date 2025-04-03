import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'

// initiaze express
const app = express()


// connect to database
await connectDB()
await connectCloudinary();

// MiddleWares
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies/authorization headers
  })
);
app.use(express.json())


// Routes
app.get('/',(req,res) => res.send("API working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use('/api/company', companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)


// port
const PORT = process.env.PORT || 3000

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

startServer();
