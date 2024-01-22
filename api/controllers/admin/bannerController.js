import cloudinary from '../../config/cloudinary.js';

import Banner from '../../Models/bannerModel.js';


export const createBanner = async (req, res) => {
  try {
    const { bannerTitle,bannerImage } = req.body;
    console.log(req.body);
    

    const cloudinaryResponse = await cloudinary.uploader.upload(bannerImage, {
        folder: 'cloudinaryImage',
      });
      console.log(cloudinaryResponse);

    const newBanner = new Banner({
      title: bannerTitle,
      image: cloudinaryResponse.secure_url,
      
    });

    const savedBanner = await newBanner.save();
    res.status(201).json({ message: 'Banner created successfully' });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

    export const getBanners = async(req,res)=>{
        try {
            const banners = await Banner.find({})
            res.status(200).json(banners);
        } catch (error) {
            console.error("Error fetching banners:", error);
             res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // export const updateBanner = async(req,res) =>{
    //     try {
    //         const { id } =req.params;
    //         const { title, image } = req.body

    //     const updateBanner = await Banner.findByIdAndUpdate(
    //         id,
    //         { title, image },
    //         {new: true }
    //     )    
    //         res.status(200).json(updateBanner)
    //     } catch (error) {
    //         console.error("Error updating banner:", error);
    //         res.status(500).json({ message: "Internal Server Error" }); 
    //     }
    // }

    export const deleteBanner = async(req,res)=>{
        try {
            const { id } = req.params;
            await Banner.findByIdAndDelete( id )
            res.status(204).end();
        } catch (error) {
            console.error("Error deleting banner:", error);
            res.status(500).json({ message: "Internal Server Error" });
          }
    }