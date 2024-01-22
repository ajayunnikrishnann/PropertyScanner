import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'; 
import userRouter  from './routes/user/user.route.js'
import adminRouter from './routes/admin/adminRoute.js'
import { verifyToken } from './utils/verifyUser.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import listingRouter from './routes/listing.routes.js'
import dotenv from 'dotenv'

dotenv.config()


const port = process.env.PORT || 3000;

mongoose.connect('mongodb://0.0.0.0:27017/PropertyScanner')
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('Error connecting to MongoDB:', err));



const app = express();
app.use(cookieParser());

app.get('/test-verify-token', verifyToken, (req, res) => {
    res.send('Token verification successful');
});
app.use(express.static('api/Public'));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/listing',listingRouter);


app.use(notFound);
app.use(errorHandler);