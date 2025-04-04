import express from 'express'
import { applyForJob, getUserApplications, updateUserResume, registerUser, loginUser } from '../controllers/userControllers.js'
import upload from '../config/multer.js'
import { protectUser } from '../middleware/authUserMiddleware.js'

const router = express.Router()

// Register a user
router.post('/register',upload.single('image'), registerUser)

// User login
router.post('/login',loginUser)

// Applay for a job
router.post('/apply', protectUser, applyForJob)

// get applied jobs data
router.get('/applications', protectUser, getUserApplications)

// update user profile (resume)
router.post('/update-resume', protectUser, upload.single('resume'), updateUserResume)

export default router;  