import express from 'express'
import { applyForJob, getUserApplications, getUserData, updateUserResume } from '../controllers/userControllers.js'
import upload from '../config/multer.js'

const router = express.Router()

// get usser data
router.get('/user', getUserData)

// Applay for a job
router.post('/apply', applyForJob)

// get applied jobs data
router.get('/applications', getUserApplications)

// update user profile (resume)
router.post('/update-resume',upload.single('resume'), updateUserResume)

export default router;