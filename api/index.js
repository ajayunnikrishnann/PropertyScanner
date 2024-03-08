import express from 'express'
import cookieParser from 'cookie-parser'
// import mongoose from 'mongoose'; 
import userRouter  from './routes/user/user.route.js'
import adminRouter from './routes/admin/adminRoute.js'
import { verifyToken } from './utils/verifyUser.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import listingRouter from './routes/listing.routes.js'
import stripe from './routes/stripe.js'
import path from 'path'
import cors from "cors"
import User from './Models/user.Model.js';
import { storeNotification } from './controllers/notificationController.js';
import connectDB from './config/db.js'
import dotenv from 'dotenv'



dotenv.config()


const port = process.env.PORT || 4000;
console.log("port:",port);





const app = express();

app.use(cookieParser());
app.use(cors());


app.get('/test-verify-token', verifyToken, (req, res) => {
    res.send('Token verification successful');
});
app.use(express.static('api/Public'));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/listing',listingRouter);
app.use("/api/stripe",stripe );


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    const clientDistPath = path.join(__dirname, '/client/dist');

    app.use(express.static(clientDistPath));

    app.get('*', (req, res) => res.sendFile(path.resolve(clientDistPath, 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Server is ready'));
}


const server = app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})
connectDB();


app.use(notFound);
app.use(errorHandler);


import ("socket.io").then ((socketIo) => {
    const io = new socketIo.Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:5173",
        }
    })

    
    io.on("connection", (socket) => {
        console.log("connected to socket.io")
        let userInfo;

        socket.on("setup", async (user) => {
           
            userInfo = { ...user, online: true } 
            console.log("userInfo.id-",userInfo._id);
            socket.join(userInfo._id)
           
            socket.emit("connected")
            
           
            io.to(user.id).emit("userStatus", { userId: user._id, online: true, lastSeen: new Date() });
        })

        socket.on("join chat", (room) => {
            socket.join(room)
            console.log("User joined Room: " + room)
        })

        socket.on("typing", (room) => socket.in(room).emit("typing"))
        socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

        socket.on("new Message", async (newMessageReceived) => {
            console.log("newmessagee:",newMessageReceived);
            let chat = newMessageReceived.chat;
            
            
            if (!chat.users) return console.log("chat.users not defined");

            
            for (const user of chat.users) {
                console.log("user._id",user._id);
                console.log("newMessageReceived.sender._id:",newMessageReceived.sender._id);
                if (user._id == newMessageReceived.sender._id) continue;

               
                console.log("useridd:",user._id);
                const isUserOnline = io.sockets.adapter.rooms.has(user._id);


                
                if (!isUserOnline) {
                    console.log("not online");
                    socket.in(user._id).emit("message received", newMessageReceived);

                   
                    await storeNotification(user._id, newMessageReceived);
                } else {
                    
                    socket.in(user._id).emit("message received", newMessageReceived);
                }
            }
        });


        

        socket.off("setup", () => {
            console.log("User Disconnected");
            if (userInfo) {
                socket.leave(userInfo.id);
                io.emit('userStatus', { userId: userInfo._id, online: false, lastSeen: new Date() });
                userInfo = null;  
            }
        })

        socket.on("disconnect", async () => {
            console.log("User disconnected");
            if (userInfo) {
                await User.updateOne({ _id: userInfo._id }, { online: false, lastSeen: new Date() });
                io.to(userInfo.id).emit('userStatus', { userId: userInfo.id, online: false, lastSeen: new Date() });
                socket.leave(userInfo._id);
                userInfo = null;  
            }
        });


    })
}).catch((error) => {
    console.error("Error importing socket.io:", error);
});