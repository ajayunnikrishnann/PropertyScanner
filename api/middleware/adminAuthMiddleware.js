import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../Models/adminModel.js'

const authenticateAdmin = asyncHandler( async (req, res, next) => {
    const tokenFromRequest = req.cookies.adminJwt;

    if (tokenFromRequest) {
        try {

            
            const decodedTokenData = jwt.verify( tokenFromRequest, process.env.JWT_CODE);

            
            const requestUser = await Admin.findById(decodedTokenData.userId).select('-password');

            console.log("decodedTokenData",decodedTokenData);
            console.log("requestUser",requestUser);
            if (requestUser) {
                req.user = requestUser; 
                next(); 
            }

        } catch (error) {
            res.status(401);
            throw new Error(`Authentication Failed. Invalid token found`);
        }
    } else {
        res.status(401);
        throw new Error(`Authentication Failed. No token found`);
    }
});


export default authenticateAdmin;