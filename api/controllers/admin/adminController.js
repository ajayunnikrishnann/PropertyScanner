import Admin from "../../Models/adminModel.js";
import asyncHandler from "express-async-handler";
import AdmingenarateToken from "../../utils/adminGenerateToken.js";
// import { blocksUser,unblocksUser } from "../../helpers/adminHelpers.js";
import User from "../../Models/user.Model.js"
import Listing from "../../Models/listing.models.js";


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




export const  getUsers = asyncHandler(async (req, res) => {
  const usersData = await User.find({}, { username: 1, email: 1, mobile: 1, isBlocked: 1, profileImageName: 1 });
 
  if(usersData){
      res.status(200).json({ usersData });
  }else{
      res.status(404);
      throw new Error("Users data fetch failed.");
  }
});

export const blockUser = asyncHandler( async (req, res) => {
  const userId = req.body.userId;
 console.log(req.body);
  const usersBlockStatus = await User.findByIdAndUpdate({_id:userId},{$set:{isBlocked:true}});
  if(usersBlockStatus.success){
      const response = usersBlockStatus.message;
      res.status(200).json({ message:response });
  }else{
      res.status(404);
      const response = usersBlockStatus.message;
      throw new Error(response);
  }
});

export const unBlockUser = asyncHandler( async (req, res) => {
  const userId = req.body.userId;
  const usersBlockStatus =   await User.findByIdAndUpdate({_id:userId},{$set:{isBlocked:false}});
  if(usersBlockStatus.success){
      const response = usersBlockStatus.message;
      res.status(200).json({ message:response });
  }else{
      res.status(404);
      const response = usersBlockStatus.message;
      throw new Error(response);
  }
});



 export const adminLogout = asyncHandler(async(req,res)=> {
  res.cookie("Adminjwt","", {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({message:  "Logout successfull"})
 })

 export const getBoostedListings = async (req, res) => {
  try {
    const boostedListings = await Listing.find({ isBoosted: true })
      .select('name imageUrls expiresOn')
      .populate({ path:'userRef',  select:'username' ,model: 'User'});

    res.status(200).json(boostedListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};