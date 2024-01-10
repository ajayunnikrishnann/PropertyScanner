import express from 'express';
const router = express.Router();
// import {  authUser } from '../controllers/user.controller.js';
import {
    signup,
    verifyRegistration,
    googleRegister,
    logout,
    authUser,
    forgotPassword,
    verifyAndChangePassword,
    changePassword,
    updateUserProfile,
    getProfile
} from '../controllers/auth.controller.js'




router.post('/auth',authUser)

router.post('/register',signup)
router.post('/verifyRegistration',verifyRegistration)
router.post('/googleRegister',googleRegister)
router.get("/logout",logout)
router.post('/forgotPassword',forgotPassword)
router.post('/verifyAndChangePassword',verifyAndChangePassword)
router.post('/changePassword',changePassword)
router.post('/updateProfile',updateUserProfile)
router.get('/getProfile',getProfile)


export default router;