import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protectUser = async (req,res,next) => {
    console.log("inside the middleware")
    const token = req.headers.token


    if(!token){
      return res.status(401).json({success: false, message: 'Not authorized, token missing or invalid'})

    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        // req.User = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'user not found' });
        }

        req.auth = { userId: user._id, user };

        console.log(req.auth)

        console.log("going out of middleware")

        next();

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}