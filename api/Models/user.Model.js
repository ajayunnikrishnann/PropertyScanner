import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        
        
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    mobile: {
        type:String,
       
    },
    password: {
        type:String,
       
    },
    profileImageName: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    auctionAmount: {
        type: Number,
        default: 0, 
    },
    
},{timestamps:true});


userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User',userSchema);

export default User;

