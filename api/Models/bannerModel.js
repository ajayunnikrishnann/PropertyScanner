import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    image: {
        type: String,
        
    },

    created_at: {
        type: Date,
        default: Date.now,
    },
   
})


const Banner = mongoose.model('Banner',bannerSchema);

export default Banner;