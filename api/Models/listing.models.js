import mongoose, {Schema} from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
        isBoosted: {
            type: Boolean,
            default: false,
          },
        expiresOn: {
            type: Date,
            default: null
          },
        isAuction: {
            type: Boolean,
            default: false,
        },
        isTimer: {
            type: Boolean,
            default: false,
        },
        expiresOn: {
            type: Date,
            default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), 
          },
          RegisteredUsers:{
            type: Array,
        },
        Winner:{
            type:  Schema.Types.ObjectId,
            ref: 'User',
          default: null,
        },

        
    },{timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing ;