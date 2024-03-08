import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Listing from '../Models/listing.models.js'
import User from '../Models/user.Model.js'
dotenv.config();
const app = express();
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post("/create-checkout-session",async (req,res)=>{
    try {
        const { customerName, customerAddress,customerEmail, listingId } = req.body;
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: 'Boost Property Amount',
                  },
                  unit_amount: 500 * 100,
                },
                quantity: 1,
              },
            ], 
            mode: "payment",
            customer_email: customerEmail, 
      shipping_address_collection: {
        allowed_countries:  ["IN", "US"], 
      },
      billing_address_collection: "required", 
      payment_intent_data: {
        metadata: {
          customerName,
          customerAddress,
          customerEmail,
          listingId,
        },
      },
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
            
          });
          const today = new Date();
          const expiresOn = new Date(today);
          expiresOn.setDate(today.getDate() + 30);
          await Listing.findByIdAndUpdate(listingId, { isBoosted: true, expiresOn: expiresOn});
          res.send({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

)

router.post("/handle-success", async (req, res) => {
  try {
    console.log("Handling success...");
      const session = req.body;
      
      const metadata = session.data.object.metadata;
      const listingId = metadata.listingId;

      console.log("Listing ID:", listingId);
      
      await Listing.findByIdAndUpdate(listingId, { isBoosted: true });

      
      console.log("Listing boosted successfully!");

      const userId = session.data.object.metadata.userId;
      const user = await User.findById(userId);
      if (user) {
        user.listings.forEach(async (userListing) => {
          if (userListing.listingId.toString() === listingId.toString()) {
            userListing.isBoosted = true;
            await user.save();
          }
        });
      }

      res.json({ success: true, message: "Listing boosted successfully!" });
  } catch (error) {
    console.error("Error in /handle-success route:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;