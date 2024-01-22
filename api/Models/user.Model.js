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
    isBlocked: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User',userSchema);

export default User;

