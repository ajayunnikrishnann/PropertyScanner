// import Admin from "../Models/adminModel";
// import asyncHandler from "express-async-handler";
// import AdmingenarateToken from "../utils/adminGenerateToken.js";

// export const adminAuth = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
  
//     const admin = await Admin.findOne({ email });
  
//     if (admin && (await admin.matchPassword(password))) {
//       AdmingenarateToken(res, admin._id);
  
//       res.status(201).json({
//         _id: admin._id,
  
//         email: admin.email,
//       });
//     } else {
//       res.status(401);
//       throw new Error("Invalid email or password");
//     }
//   });

  
// export const registerAdmin = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
  
//     const AdminExists = await Admin.findOne({ email });
  
//     if (AdminExists) {
//       res.status(400);
//       throw new Error("Admin already exists");
//     }
  
//     const admin = await Admin.create({
//       email,
//       password,
//     });
  
//     if (admin) {
//       AdmingenarateToken(res, admin._id);
  
//       res.status(201).json({
//         _id: admin._id,
  
//         email: admin.email,
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid user data");
//     }
//   });

//  export  const adminLogout = asyncHandler(async (req, res) => {
//     res.cookie("Adminjwt", "", {
//       httpOnly: true,
//       expires: new Date(0),
//     });
//     res.status(200).json({ message: "loggout successful" });
//   });