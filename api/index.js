import express from 'express'
import mongoose from 'mongoose'; 
import userRouter  from './routes/user.route.js'
// import authRouter from './routes/auth.route.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://0.0.0.0:27017/PropertyScanner')
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('Error connecting to MongoDB:', err));



const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

app.use('/api/users',userRouter);
// app.use('/api/auth',authRouter);

app.use(notFound);
app.use(errorHandler);