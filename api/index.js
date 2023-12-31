import express from 'express'
import mongoose from 'mongoose'; 
import userRouter  from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.Mongo).then(()=>{
    console.log('Connected to Mongodb');
}).catch((err)=>{
    console.log(err);
})

const app = express();
app.use(express.json())

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message =err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,  //if the variable and key has the same name ,After Es6 there is no need to say statusCode equals statusCode,we can remove one
        message,

    })
})