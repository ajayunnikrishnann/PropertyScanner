import express from 'express';
import { createListing,deleteListing,updateListing, getListing,getListings,unBoostListing, auctionCreateListing, getAuctionListings, chooseWinner, getWinner,} from '../controllers/listing.controller.js';
// import { verifyToken } from '../utils/verifyUser.js'; 
import { verifyTokenn } from '../utils/verifyUserr.js';
import { registerForAuction } from '../controllers/listing.controller.js';
const router = express.Router();

router.post('/create',verifyTokenn,createListing)
router.get('/get/:id', getListing)
router.post('/update/:id',verifyTokenn,updateListing)
router.delete('/delete/:id',verifyTokenn,deleteListing)
router.get('/get',getListings)
router.put('/unBoost/:listingId',verifyTokenn, unBoostListing)
router.post('/auctionCreate',verifyTokenn,auctionCreateListing)
router.get('/auction-listings',verifyTokenn, getAuctionListings);
router.post('/registerAuction',verifyTokenn, registerForAuction);
router.post('/chooseWinner/:listingId',verifyTokenn, chooseWinner);
router.get('/getWinner/:listingId',verifyTokenn, getWinner);


export default router; 