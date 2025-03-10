import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.js";

//Register a new company
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body

    const imageFile = req.file

    if (!name || !email || !password || !imageFile) {
        return req.json({ success: false, message: "Missing Details" });
    }

    try {
        const companyExists = await Company.findOne({ email })

        if (companyExists) {
            return req.json({ success: false, message: "Company already registered" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        console.log(imageUpload.secure_url);


        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                namw: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Company login 
export const loginCompany = async (req, res) => {

    const { email, password } = req.body

    try {

        const company = await Company.findOne({ email })

        if (bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    namw: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else{
            res.json({success: false, message: 'Invalid email or password'})
        }

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}

// Get Company data 
export const getCompanyData = async (req, res) => {

}

// Post a new job
export const postJob = async (req, res) => {

    const {title, description, location, salary, level, category} = req.body

    const companyId = req.company._id

    // console.log(companyId, { title, description, location, salary});
   
    try {
        const newJob =  new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })

        await newJob.save();

        res.json({success: true, newJob});

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}

// Get Company job Applicants
export const getCompanyJobApplicants = async (req, res) => {

}

// Get Company posted job
export const getCompanyPostedJob = async (req, res) => {

}

// Change Job Application Status => resume is selected or rejected
export const changeJobApplicationStatus = async (req, res) => {

}

// Change Visibility
export const changeVisibility = async (req, res) => {

}
