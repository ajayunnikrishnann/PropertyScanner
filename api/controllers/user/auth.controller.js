import User from "../../Models/user.Model.js";
import asyncHandler from "express-async-handler";
import nodeMailer from "nodemailer"
import generateToken from '../../utils/userGenerateToken.js'
import destroyUserToken from '../../utils/destroyUserToken.js'
import dotenv from "dotenv"
// import otpGenerator from "generate-otp";
import OTPVerification from '../../Models/otpModel.js'
import cloudinary from "cloudinary"
import Banner from "../../Models/bannerModel.js";
import Listing from "../../Models/listing.models.js";
import { errorHandler } from "../../utils/error.js";
import bcrypt from 'bcryptjs';
dotenv.config();

cloudinary .config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
})

export const authUser = asyncHandler(async (req,res) => {
    const {email, password } = req.body;

    if (!email || !password) {
        res.status(401)
        throw new Error('Email or Password is missing in the request, User authentication failed')
    }

    const user = await User.findOne({ email, verified: true  });
    if(!user) {
        res.status(401);
        throw new Error('User not found, User authentication failed');
    }

    if(user.isBlocked){
        res.status(401);
        throw new Error("Sorry you are blocked ")
    }

    let passwordValid = false
    if (user) {
        passwordValid = await user.matchPassword(password)
    }

    if (passwordValid) {
        const existingToken = req.cookies.userJwt

        if (existingToken) {
            console.log("Existing token found. Destroying...")
           
            destroyUserToken(res, existingToken);
        }

        generateToken(res, user._id);

        let registeredUserData ={
            _id: user._id,
            username: user.username,
            email: user.email,
            mobile: user.mobile,
            image:  user.profileImageName,
        }
        if (user.profileImageName) {
            registeredUserData.profileImageName = user.profileImageName
        }
        res.status(201).json(registeredUserData)
    }

    if (!user || !passwordValid) {
        res.status(401)
        throw new Error('Invalid Email or Password, User authentication failed')
    }
})



export const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,mobile,password} =req.body ;

    if (!username || !email || !password || !mobile) {
        res.status(400)
        throw new Error('Please provide all required fields');
    }

    const existingUser = await User.findOne({
        email: email,
        verified: true
    });

    if (existingUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    const existingUnverifiedUser = await User.findOne({
         email: email ,
        verified: false
    });

    if (existingUnverifiedUser) {
        
        await existingUnverifiedUser.deleteOne();
    }
   
    const user = await User.create({
        username: username,
        email: email,
        password: password,
        mobile: mobile
    })
    if(user) {

        generateToken(res, user._id)
        sendOtpVerification(user, res)
        let registeredUserData = {
            username: user.username,
            email: user.email,
            id: user._id,
           
        }
        res.status(200).json({"message":registeredUserData})
    } else {
        res.status(400)
        throw new Error('Invalid user data, User registration failed')
    }

})

let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASSWORD,
    }
})

const sendOtpVerification = asyncHandler(async ({_id, email}, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        console.log(otp);
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Your OTP is <b>${otp}</b></p><p>This code <b>expires in one minute</b></p>`
        };

        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOtpVerification = new OTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 60000
        });

        await newOtpVerification.save();
  
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("it has an error", err);
            } else {
                console.log("email has send");
            }
        }); 
    } catch (error) {
        console.log("otperrorrr",error);
        res.json({
            status: "Failed",
            message: error.message
        });
    }
})


export const verifyOtp = asyncHandler(async (req, res) => {
    try {
        console.log(req.user);
        let otp = req.body.otp
    let userId = req.user._id
   
    if (!otp) {
        throw new Error ("Empty Otp details are not allowed")
    } else {
        const UserOtpVerificationRecords = await OTPVerification.find({ userId })
        if (UserOtpVerificationRecords.length <= 0) {
            throw new Error ("Account record doesn't exist or has been verified. Please signup or login")
        } else {
            const { expiresAt } = UserOtpVerificationRecords[0]
            const hashedOTP = UserOtpVerificationRecords[0].otp

            if (expiresAt < Date.now()) {
                await OTPVerification.deleteMany({ userId })
                throw new Error('Otp expired')
            } else {
                const validOTP = bcrypt.compare(otp, hashedOTP)
                console.log(validOTP);
                if (!validOTP) {
                    throw new Error ("Invalid OTP. Check your inbox.")
                } else {
                    await User.updateOne({ _id: userId }, { verified: true })
                    await OTPVerification.deleteMany({ userId })
                    let registeredUserData = {
                        username: req.user.username,
                        email: req.user.email,
                        id: req.user._id,
                        

                    }
                    res.status(201).json(registeredUserData)
                }
            }
        }
    }
    } catch (error) {
        console.log("verifyotp",error); 
    }
    
})

export const resendOtp = asyncHandler(async(req,res)=> {
    let userId = req.user._id
    let email = req.user.email

    if (!userId || !email) {
        throw new Error("No user Details")
    } else {
        await OTPVerification.deleteMany({ userId })
        sendOtpVerification({ _id: userId, email }, res)
        res.status(200).json({"message": "otp resended"})
    }
})
 


export const googleLogin = async(req,res)=>{
    const username = req.body.googleName
    const email = req.body.googleEmail
    const user = await User.findOne({email})
        if(user){
            generateToken(res,user._id)
            res.status(201).json({
                _id:user._id,
                username:user.username,
                email:user.email,
            })
        }else{
            const user = await User.create({
                username,
                email
            })
            if(user){
                generateToken(res,user._id)
                res.status(201).json({
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                })
            }
        }

}


export const logout = asyncHandler(async (req,res)=>{
    destroyUserToken(res)
    res.status(200).json({message: 'User Logged out'})
})


export const forgotPassword = asyncHandler(async(req,res)=>{
    const { email } = req.body;

    
    const existingUser = await User.findOne({ email });

    if(!existingUser) {
        return res.status(404).json({ success:false, message: "User not found"})
    }

    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });
    
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "OTP for Verification",
        text: `Your OTP for verification is: ${otp}`,
      };

      try {
        await OTPVerification.create({ email,otp });
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
      }
})



export const verifyAndChangePassword = asyncHandler(async(req,res)=>{
    const {email,otp, newPassword} = req.body;

    try {
        const otpDocument = await OTPVerification.findOne({email, otp})

        if(!otpDocument){
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res
            .status(404)
            .json({ success: false, message: "User not found"})
        }

        user.password = password
        await user.save();
        await otpDocument.remove();

        res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res
          .status(500)
          .json({ success: false, message: "Failed to update password" });
    }
})



 export const changePassword = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({ email });

    if(!user){
        res.status(404).json({ success: false, message: "User not found" });
    return;
    }

    user.password = password;
    await user.save();

    res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
})


export const updateUserProfile = asyncHandler(async(req,res)=>{
    const { email, username, profileImage, mobile } = req.body;

    const user = await User.findOne({email});
    if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      
    if(user) {
        user.username = username || user.username
        user.mobile = mobile || user.mobile

        if(profileImage){
            const result = await cloudinary.uploader.upload(profileImage,{
                folder:"profilepic",
            })
            user.profileImageName = result.secure_url || user.profileImageName
        }

        const updatedUser = await user.save();
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImageName: updatedUser.profileImageName,
        })
    }else {
        res.status(404);
        throw new Error("User not found")
    }
})


 export const getProfile = asyncHandler(async(req, res)=> {
    const {email, userId } = req.query

    const user = await User.findOne({email});

    if(user) {
        res.status(200).json({ user })
    }
})

export const getBanner = async(req,res) => {
   
    try {
        const banner = await Banner.findOne({}).sort({ created_at: -1 }).exec();
        res.status(200).json(banner);
      } catch (error) {
        console.error('Error fetching banner:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export const getUserListings = async (req, res, next) => {
    if (req.params.id) {
        
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandler(401, 'You can only view your own listings!'));
    }
  };
  

  export const getUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) return next(errorHandler(404,'User not found!'));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
  }

  export const checkBlock = asyncHandler(async (req,res)=> {
    const users = await User.findById(req.body.id)
    if (users) {
        res.status(200).json(users)
    }
  })