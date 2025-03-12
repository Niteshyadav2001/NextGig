import { response } from "express";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary'


// get user data 
export const getUserData = async (req, res) => {

    const userId = req.auth.userId;

    try {

        const user = await User.auth.findById(userId);

        if (!user) {
            res.json({ success: false, message: 'User not found !!' })
        }

        res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Apply for a job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body;

    const userId = req.auth.userId;

    try {

        const isAlreadyApplied = await JobApplication.find({ jobId, userId });

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'Already applied' })
        }

        const jobData = await jobId.findById(jobId)

        if (!jobData) {
            return res.json({ success: false, message: 'Job Not Found' })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: 'Applied Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get user applications
export const getUserApplications = async (req, res) => {

    try {

        const userId = req.auth.userId;

        const applications = await JobApplication.find({ userId })
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description location category level salary')
        .exec();

        if(!applications){
            return res.json({ success: false, message: 'No job application found' });
        }

        return res.json({success: true, applications});
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {

        const userId = req.auth.userId;

        const resumeFile = req.resumeFile;

        const userData = await User.findById(userId);

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
        }

        await userData.save();

        res.json({ success: true, message: 'Resume Uplated' })
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
