import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
console.log("CLOUDNAME:", process.env.CLOUDNAME);
console.log("APIKEY:", process.env.APIKEY);
console.log("APISECRET:", process.env.APISECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

export default cloudinary;