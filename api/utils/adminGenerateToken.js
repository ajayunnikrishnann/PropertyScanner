import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const AdmingenarateToken = (res, userId) => {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_CODE, {
    expiresIn: "30d",
  });
  
  res.cookie("adminjwt", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production',
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default AdmingenarateToken;