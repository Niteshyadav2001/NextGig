import { response } from "express";
import JobApplication from "../models/jobApplication.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import Job from "../models/job.js";
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


// Apply for a job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body;

    const userId = req.auth.userId;

    try {

        const isAlreadyApplied = await JobApplication.find({ jobId, userId });

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'Already applied' })
        }

        const jobData = await Job.findById(jobId)

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


// update name of user
export const updateProfile = async(req,res) => {
    try {
        const userId = req.auth?.userId;

        if(!userId) {
            return res.json({success: false, message: "User is not found."})
        }

        const imageFile = req.file;

        if(!imageFile){
            return res.json({success: false, message: "Please select a photo!!"})
        }

        const userData = await User.findById(userId);

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path);
            userData.image = imageUpload.secure_url;
        }

        await userData.save();

        return res.json({ success: true, message: 'Profile updated successfully', user: {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            image: userData.image,
            resume: userData.resume,
        }, })

    } catch (error) {
        return res.json({ success: false, message: error.message})        
    }
}


// update name of user
export const updateName = async(req,res) => {
    try {
        const userId = req.auth?.userId;

        if(!userId) {
            return res.json({success: false, message: "User is not found."})
        }

        const userData = await User.findById(userId);

        if(!userData) {
            return res.json({success: false, message: "User is not found."})
        }

        const { newName } = req.body;

        userData.name = newName;

        await userData.save();

        return res.json({
            success: true,
            message: "Name Updated Sucessfully",
            user: {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                image: userData.image,
                resume: userData.resume,
            },
        })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}



// update password of user
export const updatePassword = async(req,res) => {
    try {
        const userId = req.auth?.userId;

        if(!userId) {
            return res.json({success: false, message: "User is not found."})
        }

        const {password, newPassword } = req.body;
        const userData = await User.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found." });
          }

        if (!(await bcrypt.compare(password, userData.password))) {
            return res.json({ success: false, message: 'Old password is incorrect' });
        }
          
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        userData.password = hashPassword;
        await userData.save()

        return res.json({
            success: true,
            message: "Password Updated Sucessfully"
        })
    } catch (error) {
        return res.json({ success: false, message: error.message})
    }
}


// Delete Account of user
export const deleteAccount = async (req, res) => {
    try {
      const userId = req.auth?.userId;

      const { password } = req.body;
  
      if (!userId) {
        return res.json({ success: false, message: "User is not found" });
      }
  
      const userData = await User.findById(userId);
  
      if (!userData) {
        return res.json({ success: false, message: "User not found or already deleted" });
      }

      if (!(await bcrypt.compare(password, userData.password))) {
        return res.json({ success: false, message: 'Wrong Password' });
    }
  
      return res.json({
        success: true,
        message: "Account deleted successfully"
      });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };
  