import express from "express";
import { 
    registerAdmin,
    adminAuth,
    getUsers,
    blockUser,
    unBlockUser,
    adminLogout,
    getBoostedListings,
    

} from "../../controllers/admin/adminController.js";
import { verifyToken } from "../../utils/verifyUser.js";
import { createBanner, getBanners, deleteBanner } from "../../controllers/admin/bannerController.js";
import adminAuthMiddleware from '../../middleware/adminAuthMiddleware.js'

const router = express.Router();

router.post("/adminRegister", registerAdmin);
router.post("/adminAuth", adminAuth);
router.get("/getUsers",getUsers)
router.post("/blockUser",blockUser)
router.post("/unBlockUser",unBlockUser)
router.post("/adminLogout", adminLogout)
router.post("/createBanner", createBanner);
router.get("/getBanners", getBanners);
router.delete("/deleteBanner/:id", deleteBanner);
router.get('/boosted-listings', getBoostedListings);

export default router;  