import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
        text: {
            type: String, 
        },
        image: {
            type: String
        }
    }, 
    {timestamps: true }
)

const Message = mongoose.model("Message", messageSchema)

export default Message ; 

/*
Message model is imp for storing conversations between users in a chat app. It must include details such as who sent the message, who received it, the message content, timestamps, and status (read/unread)
*/