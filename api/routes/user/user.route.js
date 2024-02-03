import express from 'express';
const router = express.Router();

// import {  authUser } from '../controllers/user.controller.js';


import {
    signup,
    verifyRegistration,
    googleLogin,
    logout,
    authUser,
    forgotPassword,
    verifyAndChangePassword,
    changePassword,
    updateUserProfile,
    getProfile,
    getBanner,
    getUserListings,
    getUser,

} from '../../controllers/user/auth.controller.js'

import { verifyToken } from '../../utils/verifyUser.js';



router.post('/auth',authUser)

router.post('/register',signup)
router.post('/verifyRegistration',verifyRegistration)
router.post('/googleLogin',googleLogin)
router.get("/logout",logout)
router.post('/forgotPassword',forgotPassword)
router.post('/verifyAndChangePassword',verifyAndChangePassword)
router.post('/changePassword',changePassword)
router.post('/updateProfile',updateUserProfile)
router.get('/getProfile',getProfile)
router.get('/getUserBanner',getBanner)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)

export default router;