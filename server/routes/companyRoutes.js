import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJob, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

// Register a company
router.post('/register',upload.single('image'), registerCompany)

// Company Login 
router.post('/login',loginCompany)

// Get Company data 
router.get('/company', protectCompany, getCompanyData)

// Post a job 
router.post('/post-job', protectCompany, postJob)

// Get Applicants Data of Company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

// Get company job list
router.get('/list-job', protectCompany, getCompanyPostedJob)

// Change Application Status
router.post('/change-status', protectCompany, changeJobApplicationStatus)

// Change Visibility
router.post('/change-visibility', protectCompany, changeVisibility)

export default router