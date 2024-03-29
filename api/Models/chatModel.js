import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User' 
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatMessage"
        }
    },
    {
        timestamps: true  
    }
);
const ChatRoom = mongoose.model('ChatRoom', chatSchema);

export default ChatRoom;