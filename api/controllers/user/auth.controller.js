import User from "../../Models/user.Model.js";
import asyncHandler from "express-async-handler";
import nodeMailer from "nodemailer"
import generateToken from "../../utils/userGenerateToken.js";

import dotenv from "dotenv"
import otpGenerator from "generate-otp";
import OTP from '../../Models/otpModel.js'
import cloudinary from "cloudinary"
import Banner from "../../Models/bannerModel.js";

dotenv.config();

cloudinary .config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
})

export const authUser = asyncHandler(async (req,res) => {
    const {email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
        res.status(400);
        throw new Error("Email doesnot exist ");
    }

    if(user.isBlocked){
        res.status(400);
        throw new Error("Sorry you are blocked ")
    }

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            mobile: user.mobile,
            image:  user.profileImageName,
        })
    }else {
        res.status(400);
        throw new Error("Invalid email or password")
    }
})


//Register user normal
export const signup = asyncHandler(async(req,res)=>{
    const {username,email,mobile,password} =req.body ;

    const userExists = await User.findOne({email})
   

    if (userExists){
        res.status(400);
        throw new Error("User already exists")
    }
   
   
    const otp = otpGenerator.generate(6,{
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
    })

   
    const transporter = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASSWORD,
        }
    })

    console.log("gmail:",process.env.GMAIL_USER);
    console.log("pssword:",process.env.GMAIL_PASSWORD);
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
    console.log('Inside verifyRegistration');
    const {username,email,mobile,password,otp} = req.body;
    console.log('Request Body:', req.body);
    const otpDocument =await OTP.findOne({email,otp})

    if(!otpDocument){
        console.log('Invalid OTPpppp');
        res.status(400)
        throw new Error('invalid OTP')
    }
    const user = await User.create({
        username,
        email,
        mobile,
        password
    })
    
    console.log("Response.database:",user);
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


//register user using google
// export const googleRegister = asyncHandler(async(req,res) =>{
//     const { username,email,profileImageName } = req.body;

//     const userExists = await User.findOne({ email });
//     if(userExists) {
//         generateToken(res, userExists._id);

//         res.status(201).json({
//             _id: userExists._id,
//             username: userExists.username,
//             mobile: userExists.mobile,
//             email: userExists.email,
//             profileImageName: profileImageName,
//         })
//     }else {
//         const user = await User.create({
//             username: username,
//             email: email,
//             profileImageName: profileImageName,
//         }); 

//         if(user)  {
//             generateToken(res, user._id);
//             res.status(201).json({
//                 _id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 mobile: user.mobile,
//                 profileImageName: user.profileImageName
                
//             })
//         }else{
//             res.status(400);
//             throw new Error("Invalid user data")
//         }
//     }
// })


export const logout = asyncHandler(async (req,res)=>{
    res.cookie("Userjwt","", {
        httpOnly: true ,
        expires: new Date(0),
    })
    res.status(200).json({message: "Logout Succesfully"})
})


export const forgotPassword = asyncHandler(async(req,res)=>{
    const { email } = req.body;

    // Check if the user with the given email exists
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
        await OTP.create({ email,otp });
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
      }
})

//function to verify otp received from the user

export const verifyAndChangePassword = asyncHandler(async(req,res)=>{
    const {email,otp, newPassword} = req.body;

    try {
        const otpDocument = await OTP.findOne({email, otp})

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

//update the newpassword

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
    // const banner = await Banner.findOne({created_at: -1}) 
    // res.status(200).json(banner)
    try {
        const banner = await Banner.findOne({}).sort({ created_at: -1 }).exec();
        res.status(200).json(banner);
      } catch (error) {
        console.error('Error fetching banner:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}