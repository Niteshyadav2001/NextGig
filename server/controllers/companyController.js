import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.js";
import JobApplication from "../models/jobApplication.js";

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
                name: company.name,
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

        if (await bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
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


    try {
        
        console.log("inside the company data.")

        const company = req.company;
        
        res.json({success: true, company});
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
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
        res.json({success: false, message: error.message});
    }

}

// Get Company job Applicants
export const getCompanyJobApplicants = async (req, res) => {
    console.log("inside the backend")
    const companyId = req.company._id
    console.log(companyId)
    try {

        // Find job applications for the user and populate related data
        const applicants = await JobApplication.find({companyId})
        .populate('userId','name image resume')
        .populate('jobId','title location category level salary')
        .exec()

        console.log("data sucessfully sent")

        return res.json({success: true, applicants})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Get Company posted job
export const getCompanyPostedJob = async (req, res) => {
    try {
        
        const companyId = req.company._id;

        const jobs = await Job.find({companyId});

        // Adding no. of applicanmts info in data
        const jobData = await Promise.all(jobs.map(async(job) => {
            const applicants = await JobApplication.find({jobId: job._id});
            return {...job.toObject(),applicants: applicants.length}
        }))

        res.json({success:true, jobData});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Change Job Application Status => resume is selected or rejected
export const changeJobApplicationStatus = async (req, res) => {
    try {
        const { id, status } = req.body
    
        // Find job application data and update status
        await JobApplication.findOneAndUpdate({_id: id},{status})
    
        res.json({success: true, message: "Status Changed"})
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }

}

// Change Visibility
export const changeVisibility = async (req, res) => {
    try {
        
        const {id} = req.body;

        const companyId = req.company._id;

        const job = await Job.findById(id);

        if(companyId.toString() === job.companyId.toString()){
            job.visible = !job.visible;
        }

        await job.save();

        res.json({success:true, job});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
