import { response } from "express";
import JobApplication from "../models/jobApplication.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary'
import bcrypt from 'bcrypt'

// register a user
export const registerUser = async(req, res) => {
    const { name, email, password } = req.body
    const imageFile = req.file

    if (!name || !email || !password || !imageFile) {
        return req.json({ success: false, message: "Missing Details" });
    }

    try {
        const userExists = await User.findOne({ email })

        if(userExists){
            return res.json({ success: false, message: "User already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        console.log(imageUpload.secure_url);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            resume: null,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                resume: null,
            },
            token: generateToken(user._id)
        })

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// login a user
export const loginUser = async(req, res) => {
    const { email,password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (await bcrypt.compare(password, user.password)) {
            res.json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    resume: user.resume,
                },
                token: generateToken(user._id)
            })
        }
        else{
            res.json({success: false, message: 'Invalid email or password'})
        }
            
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// get user data
// export const getUserData = async (req, res) => {
//     try {
//         // Clerk middleware ensures authentication, so req.auth is available

//         const userId = req.auth?.userId;

//         if (!userId) {
//             return res.status(401).json({ message: "Unauthorized - No user ID" });
//         }

//         // Fetch user details from Clerk
//         const user = await clerkClient.users.getUser(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found in Clerk" });
//         }
//         console.log(res);
//         res.status(200).json({
//             id: user.id,
//             email: user.emailAddresses[0]?.emailAddress,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             imageUrl: user.imageUrl,
//             createdAt: user.createdAt,
//             resume: user.resume,
//         });
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };


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
        const userId = req.auth?.userId;

        if(!userId) {
            return res.json({success: false, message: "User is not found."})
        }

        const resumeFile = req.file;

        if(!resumeFile){
            return res.json({success: false, message: "Upload Resume first!!"})
        }

        const userData = await User.findById(userId);

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
        }

        await userData.save();

        return res.json({ success: true, message: 'Resume Uplated', user: {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            image: userData.image,
            resume: userData.resume,
        }, })
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
