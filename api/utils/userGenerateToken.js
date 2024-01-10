import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

 export const generateToken =(res, userId) =>{
    const token = jwt.sign({ userId }, process.env.JWT_CODE, {
        expiresIn: "30d",
    })

    res.cookie("Userjwt",token,{
        httpOnly: true,
        sameSite:"strict",
        maxAge: 30 * 24 * 60 * 1000
    })
}