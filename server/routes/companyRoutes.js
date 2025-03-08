import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJob, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'

const router = express.Router()

// Register a company
router.post('/register',upload.single('image'), registerCompany)

// Company Login 
router.post('/login',loginCompany)

// Get Company data 
router.get('/company', getCompanyData)

// Post a job 
router.post('./post-job', postJob)

// Get Applicants Data of Company
router.get('./applicants', getCompanyJobApplicants)

// Get company job list
router.get('./list-job', getCompanyPostedJob)

// Change Application Status
router.post('./change-status',changeJobApplicationStatus)

// Change Visibility
router.post('./change-visibility', changeVisibility)

export default router