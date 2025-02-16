import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getUsersForSidebar: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const getMessages = async (req, res) => {
    try {
        const { id:userToChartId}= req.params
        const myId= req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId:userToChartId},
                {senderId:userToChartId, receiverId:myId}
            ],
        });
        res.status(200).json(messages);

    } catch (error) {
        console.error("Error is getUsersForSidebar: ", error.message);
        res.status(500).json ({ error: "Inteval server error"});
    }
};

export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;
        const { id: receiverId} = req.params;
        const senderId = req.user._id; 

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMeassage= new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMeassage.save();

        //real-time meg transfer
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMeassage);
        }


        res.status(200).json(newMeassage);

    } catch (error) {
        console.error("Error is getUsersForSidebar: ", error.message);
        res.status(500).json ({ error: "Inteval server error"}); 
    }
}