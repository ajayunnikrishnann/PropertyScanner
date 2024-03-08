import Notification from "../Models/notificationModel.js";
import asyncHandler from 'express-async-handler';
import User from "../Models/user.Model.js";

async function storeNotification(userId, newMessageReceived) {
    try {
        const existingNotification = await Notification.findOne({
            sender: newMessageReceived.sender._id,
            receiver: userId
        });
        if (!existingNotification) {
            const notification = new Notification({
            sender: newMessageReceived.sender._id,
            receiver: userId,
            chat: newMessageReceived.chat._id,
            content: newMessageReceived.content
        })
            await notification.save();
            console.log(`Notification stored for user ${userId}`);
        }
    } catch (error) {
        console.error('Error storing notification:', error);
    }
}


const fetchNotifications = asyncHandler(async (req, res) => {

    
    const notifications = await Notification.find({ receiver: req.user._id }).lean();

    
    const populatedNotifications = await Notification.populate(notifications, {
        path: "chat",
    });

   
    const finalNotifications = await User.populate(populatedNotifications, {
        path: "chat.users",
        select: "name profileImageName email",
    });

    res.json(finalNotifications);
})

const deleteNotification = asyncHandler(async (req, res) => {
    const notificationId = req.params.notificationId;
    const notification = await Notification.findById(notificationId);
    if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
    }

    await notification.deleteOne();

    res.status(200).json({ message: 'Notification Deleted' });
})
export {
    fetchNotifications,
    deleteNotification,
    storeNotification
}
