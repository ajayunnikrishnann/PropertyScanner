import Admin from "../../Models/adminModel.js";
import asyncHandler from "express-async-handler";
import AdmingenarateToken from "../../utils/adminGenerateToken.js";
import User from "../../Models/user.Model.js"
import { userApiSlice } from "../../../client/src/slices/apiSlice.js";


export const adminAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const admin = await Admin.findOne({ email });
  
    if (admin && (await admin.matchPassword(password))) {
      AdmingenarateToken(res, admin._id);
  
      res.status(201).json({
        _id: admin._id,
  
        email: admin.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  });

  
export const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const AdminExists = await Admin.findOne({ email });
  
    if (AdminExists) {
      res.status(400);
      throw new Error("Admin already exists");
    }
  
    const admin = await Admin.create({
      email,
      password,
    });
  
    if (admin) {
      AdmingenarateToken(res, admin._id);
  
      res.status(201).json({
        _id: admin._id,
  
        email: admin.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

 export const getUsers = async(req,res,next)=>{
  try {
    const users = await User.find({})
    res.status(201).json(users)
  } catch (error) {
    next(error)
  }
 }

 export const blockUser = async(req,res,next)=>{
  const {id} = req.query
  try {
    const users = await User.updateOne({_id:id},{isBlocked:true})
    res.status(201).json({message:'User Blocked'})
  } catch (error) {
    next(error)
  }
 }

 export const unBlockUser = async(req,res,next)=>{
  const {id} = req.query
  try {
    const users = await User.updateOne({_id:id},{isBlocked:false})
    res.status(201).json({message:'User UnBlocked'})
  } catch (error) {
    next(error)
  }
 }