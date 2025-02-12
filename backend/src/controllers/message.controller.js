import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id ; 
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("getUsersForSidebar error: ", error || error.message);

        res.status(500).json({
            error: 'Internal Server Error'
        })        
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const myId = req.user._id ; 

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId}, 
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log('getMessages controller error: ', error || error.message);
        
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body 
        const {id: receiverId} = req.params 
        const senderId = req.user._id 

        let imageUrl ; 

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image) ;    // upload base64 image to cloudinary 

            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId, 
            receiverId, 
            text, 
            image: imageUrl
        })

        await newMessage.save() ; 

        // todo: realtime functionality goes here -> socket.io 

        res.status(201).json(newMessage)

    } catch (error) {
        console.log('sendMessage controller error: ', error || error.message) 
        
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}