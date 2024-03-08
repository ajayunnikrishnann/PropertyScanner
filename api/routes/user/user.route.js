import express from 'express';
const router = express.Router();

// import {  authUser } from '../controllers/user.controller.js';


import {
    registerUser,
    verifyOtp,
    resendOtp,
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
    checkBlock,
    

} from '../../controllers/user/auth.controller.js'

import { accessChat,fetchChats,sendMessage,allMessages } from '../../controllers/chatController.js';
import {fetchNotifications,deleteNotification} from '../../controllers/notificationController.js'
import { verifyToken } from '../../utils/verifyUser.js';
import { verifyTokenn } from '../../utils/verifyUserr.js';


router.post('/auth',authUser)

router.post('/register',registerUser)
router.post('/otpVerify',verifyToken,verifyOtp)
router.post('/resendOtp', verifyToken, resendOtp)
router.post('/googleLogin',googleLogin)
router.get("/logout",logout)
router.post('/forgotPassword',forgotPassword)
router.post('/verifyAndChangePassword',verifyAndChangePassword)
router.post('/changePassword',changePassword)
router.post('/updateProfile',verifyToken,updateUserProfile)
router.get('/getProfile',verifyToken,getProfile)
router.get('/getUserBanner',getBanner)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)
router.put('/checkBlock', checkBlock)
router.post('/accessChat',verifyToken,accessChat)
router.post('/fetchChats',verifyToken,fetchChats)
router.post('/sendMessage',verifyToken,sendMessage)
router.get('/allMessages/:chatId',verifyToken,allMessages)
router.post('/allNotifications',verifyToken,fetchNotifications)
router.delete('/deleteNotification/:notificationId', verifyToken, deleteNotification)

export default router;