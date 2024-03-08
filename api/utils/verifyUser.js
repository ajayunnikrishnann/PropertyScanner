
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../Models/user.Model.js'

  

export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.userJwt
    if (token) {
        try {
            
            const decodedTokenData = jwt.verify( token, process.env.JWT_CODE);
            const requestUser = await User.findById(decodedTokenData.userId).select('-password');
           
            if (requestUser) {  
                if (requestUser.isBlocked) {
                    console.log("blocked user");
                    res.status(401)
                  
                    throw new Error(`Yourrrrrr Account is blocked.`)
                  
                }
                req.user = requestUser; 
                
                next(); 
            
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: 'Authentication failed. You are blocked.' });
            
        }
    } else {
        res.status(401)
        throw new Error(`Authenticationn 1 Failed. No token found`)
    }
})








