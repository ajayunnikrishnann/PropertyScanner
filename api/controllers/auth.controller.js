import User from "../Models/user.Model.js";
import asyncHandler from "express-async-handler";
import nodeMailer from "nodemailer"
import dotenv from "dotenv"
import OTP from '../Models/otpModel.js'
dotenv.config();

export const signup = asyncHandler(async(req,res)=>{
    const {username,email,mobile,password} =req.body ;

    const userExists = await User.findOne({email})
    const MobileExists = await User.findOne({mobile})

    if (userExists){
        res.status(400);
        throw new Error("User already exists")
    }
    if(MobileExists){
        res.status(400);
        throw new Error("Mobile number already exists")
    }

    const otp = otpGenerator.generate((6,{
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
    }))

    const transporter = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "OTP for verification",
        text: `Your otp for verification is: ${otp}`,
    }

    try {
        await OTP.create({ email, otp});
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s",info.messageId);
        res.status(200).json({ success:true })
    } catch (error) {
        console.error("Error sending email: ",error);
        res.status(500).json({success: false,message: "Failed to send OTP"})
    }
})

 export const verifyRegistration = asyncHandler(async(req,res)=>{
    console.log('here');
    const {username,email,mobile,password,otp} = req.body;
    const otpDocument =await OTP.findOne({email,otp})

    if(!otpDocument){
        res.status(400)
        throw new Error('invalid OTP')
    }
    const user = await User.create({
        username,
        email,
        mobile,
        password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            LastName: user.LastName,
            mobile: user.mobile
        })
    }else {
        res.status(400);
        throw new Error("Invalid user data")
    }

})

