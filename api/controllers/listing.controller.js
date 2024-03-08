import Listing from "../Models/listing.models.js"
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";
// import AuctionRegistration from "../Models/auctionRegistrationModel.js";

export const createListing = async(req,res,next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404,'Listing not found!'))
     } if (req.user.userId !== listing.userRef){
        return next (errorHandler(401,'You can only delete Your own listings!'));
     }
     try {
       const result = await Listing.findByIdAndDelete(req.params.id);
       console.log('MongoDB Delete Result:', result);
        res.status(200).json('Listing has been deleted!')
     } catch (error) {
        next(error);
     }
}


export const updateListing = async (req,res,next) => {
    
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next (errorHandler(404,'Listing not found!'));
    }
    if(req.user.userId !== listing.userRef) {
        return next(errorHandler(401, 'you can only update your own listings!'))
    }


    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        )
        res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}

export const getListing = async(req,res,next) => {
    try {
      
        const listing = await Listing.findById(req.params.id);
        if(!listing) {
            return next(errorHandler(404,'Listing not found!'))
        }
        res.status(200).json(listing)
    } catch (error) {
       
        next(error)
    }
}

export const getListings = async (req,res,next) => {
    try {
        const limit = parseInt(req.query.limit) || 12 ;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        let isBoosted = req.query.isBoosted;
       
        
       

        if (isBoosted === undefined || isBoosted==='false'){
            isBoosted = { $in: [false, true]};
        }
        if (offer === undefined || offer==='false'){
            offer = { $in: [false, true]};
        }

        let furnished = req.query.furnished;

        if(furnished ===undefined || furnished === 'false'){
            furnished = { $in: [false, true]};
        }

        let parking = req.query.parking;

        if(parking === undefined || parking === 'false') {
            parking = { $in: [false,true]};
        }

        let type = req.query.type;

        if(type === undefined || type === 'all') {
            type = { $in: ['sale','rent']};
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';
        console.log("abcccc");
        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i'},
            offer,
            furnished,
            parking,
            type,
            isBoosted
        }).sort (
            {[sort]: order}
        ).limit(limit).skip(startIndex);
                console.log("listings:",listings);
        return res.status(200).json(listings)

    } catch (error) {
        next(error)
    }


}
export const unBoostListing = async(req,res,next) => {
    try {
        console.log('unBoostListing',req.params.listingId);
        const updatedListing = await Listing.findByIdAndUpdate(
            {_id: new mongoose.Types.ObjectId(req.params.listingId) },
            {isBoosted:false, expiresOn: null} 
        )
        console.log(updatedListing); 
        res.status(200)
    } catch (error) {
       console.log(error);
        next(error)
    }
}

export const auctionCreateListing = async(req,res,next) => {
    try {
        console.log(" req.body--",req.body);
        req.body.isAuction = true; 
        const listing = await Listing.create({

            ...req.body,
            expiresOn: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
        })

        return res.status(201).json(listing);
    } catch (error) {
        next(error)
    }
}



export const getAuctionListings = async(req,res,next) => {
    try {
      
        const listing = await Listing.find({isAuction:true});
        
       
        res.status(200).json(listing)
    } catch (error) {
       
        next(error)
    }
}


export const registerForAuction = async (req, res) => {
    try {
      console.log('Registering for auction with data:', req.body);
  
      const { username, email, mobile, auctionAmount,listingId } = req.body;

    
      const registration = await Listing.updateOne(
        { _id: new mongoose.Types.ObjectId( listingId) },
        {
          $push: {
            RegisteredUsers: {
              username,
              email,
              mobile,
              auctionAmount,
            },
          },});
  
      console.log('Registration successful. Data:', registration);
  
      res.status(201).json({ message: 'Registration successful', data: registration });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  

 
  



  export const chooseWinner = async  (req, res, next) => {
    try {
        const { listingId } = req.params;
        
        Listing.updateOne(
            {
              _id: listingId , 
              'RegisteredUsers.auctionAmount': { $exists: true, $ne: null },
            },
            [
              {
                $set: {
                  winner: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$RegisteredUsers',
                          cond: {
                            $eq: [
                              '$$this.auctionAmount',
                              {
                                $max: '$RegisteredUsers.auctionAmount',
                              },
                            ],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            ]
          )
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.error(error);
            });



        return res.status(200).json({ message: 'Winner chosen successfully'  });
      } catch (error) {
        next(error);
      }
  }

  export const getWinner = async (req, res, next) => {
    try {
      const { listingId } = req.params;
      
  
   
      const listing = await Listing.findOne({ _id: listingId });
  
  
  
      return res.status(200).json({ winnerInfo: listing });
    } catch (error) {
      next(error);
    }
  };