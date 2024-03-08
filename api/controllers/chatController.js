import asyncHandler from 'express-async-handler'
import ChatRoom from '../Models/chatModel.js'
import User from '../Models/user.Model.js'
import Message from '../Models/messageModel.js'
import cloudinary from '../config/cloudinary.js'

export const accessChat =  asyncHandler(async(req,res)=> {
    const { userId } = req.body;

    if(!userId) {
         return res.status(400).json({ error: "UserId parameter is required" })
    }

    const currentUser = await User.findById(req.user._id)

    let isChat = await  ChatRoom.find({
        $and: [
            {users: { $elemMatch: {$eq: req.user._id}}},
            {users: { $elemMatch: {$eq: userId}}}
        ]
    }).populate("users", "-password").populate("latestMessage")
      
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username profileImageName email"
    })
    if(isChat.length > 0) {
        res.send(isChat[0])
    }else {
        let chatData = {
            chatName:"sender",
            users:[req.user._id,userId]
        }
        try {
            const createChat = await ChatRoom.create(chatData)
            const fullChat = await ChatRoom.findOne({_id: createChat._id}).populate("users","-password")
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})  


export const fetchChats = asyncHandler(async (req, res) => {
    try {
        
        ChatRoom.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "username profileImageName email"
                })
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId, imageUrl } = req.body
    let imagesBuffer = [];

    if (imageUrl) {
        const result = await cloudinary.uploader.upload(imageUrl, {
            folder: "ChatImages",
            // width: 300,
            // crop: "scale"
        });
        imagesBuffer.push({
            public_id: result.public_id,
            url: result.url
        })
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
        images: imagesBuffer
    }

    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender", "username profileImageName")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "username profileImageName email"
        })

        await ChatRoom.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


export const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name profileImageName email")
            .populate("chat")
        res.status(200).json(messages)
    } catch (error) {
        res.status(400)
        throw new Error
    }
})