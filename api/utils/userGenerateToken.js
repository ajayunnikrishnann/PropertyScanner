import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const generateToken =(res, userId) =>{
    const jwtToken = jwt.sign({ userId }, process.env.JWT_CODE, {
        expiresIn: "30d",
    })

    const cookieOption = {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== 'production', 
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 
    }
    
    res.cookie('userJwt', jwtToken, cookieOption)
}

export default generateToken