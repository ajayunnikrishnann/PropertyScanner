import User from "../Models/user.Model.js";
import bcryptjs from 'bcryptjs';
export const signup = async(req,res) =>{
    const {username,email,mobile,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,mobile,password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json('User created Successfully');
    } catch (error) {
        res.status(500).json(error.message)
    }
  
}