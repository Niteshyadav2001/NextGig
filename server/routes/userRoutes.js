import express from 'express'
import { applyForJob, getUserApplications, updateUserResume, registerUser, loginUser, updateName, updatePassword, updateProfile, deleteAccount } from '../controllers/userControllers.js'
import upload from '../config/multer.js'
import { protectUser } from '../middleware/authUserMiddleware.js'

const router = express.Router()

// Register a user
router.post('/register',upload.single('image'), registerUser)

// User login
router.post('/login',loginUser)

// Apply for a job
router.post('/apply', protectUser, applyForJob)

// change name of user
router.post('/update-name', protectUser, updateName)

// change password
router.post('/update-password', protectUser, updatePassword)

// change profile picture
router.post('/update-profile', protectUser, upload.single('image'), updateProfile)

// Delete Account
router.post('/delete-account', protectUser, deleteAccount)

// get applied jobs data
router.get('/applications', protectUser, getUserApplications)

// update user profile (resume)
router.post('/update-resume', protectUser, upload.single('resume'), updateUserResume)

export default router;  