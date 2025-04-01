import express from 'express'
import { applyForJob, getUserApplications, getUserData, updateUserResume, registerUser, loginUser } from '../controllers/userControllers.js'
import upload from '../config/multer.js'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = express.Router()

// Register a user
router.post('/register',upload.single('image'), registerUser)

// User login
router.post('/login',loginUser)

// get usser data
router.get('/user', ClerkExpressRequireAuth(), getUserData);

// Applay for a job
router.post('/apply', applyForJob)

// get applied jobs data
router.get('/applications', getUserApplications)

// update user profile (resume)
router.post('/update-resume',upload.single('resume'), updateUserResume)

export default router;  