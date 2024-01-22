import express from "express";
import { 
    registerAdmin,
    adminAuth,
    getUsers,
    blockUser,
    unBlockUser,
    

} from "../../controllers/admin/adminController.js";

import { createBanner, getBanners, deleteBanner } from "../../controllers/admin/bannerController.js";
// import { multerUploadHotelImages } from "../../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/adminRegister", registerAdmin);
router.post("/adminAuth", adminAuth);
router.get("/getUsers",getUsers)
router.get("/blockUser",blockUser)
router.get("/unBlockUser",unBlockUser)

router.post("/createBanner", createBanner);
router.get("/getBanners", getBanners);
// router.put("/updateBanner/:id", updateBanner);
router.delete("/deleteBanner/:id", deleteBanner);


export default router;  