import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res) =>{
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        

        let conversation = await Conversation.findOne({
            participants:{$all: [senderId,receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId,receiverId]
            })
        }
        const newMessage  = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        // await conversation.save();
        // await newMessage.save()
        await Promise.all([conversation.save(),newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }




        res.status(200).json(newMessage)

        
    } catch (error) {
        console.log("error in message controller ", error.message);
        res.status(400).json({error:"Internal server error"})
    }
   
}

// To get all chat history from a userId
export const getMessages = async(req,res) =>{
    try {
        const userId = req.user._id;
        const {id: userToChatId} = req.params;

        const conversation = await Conversation.findOne({
            participants: {$all: [userId,userToChatId]}
        });
        if(!conversation){ 
            res.status(200).json([]);
             return;}
        var messages = []

        // const returnMessage = async (id) =>{ await Message.findById(id).then(user => {
        //     if (user) {
        //         return user
        //     } else {
        //       console.log('User not found');
        //     }
        //   })}
        // const messagePromises = conversation.messages.map( (messageId) =>  returnMessage(messageId))
        for (const messageId of conversation.messages) {
            try {
                const user = await Message.findById(messageId);
    
                if (user) {
                    messages.push(user);
                } else {
                    console.log('Message not found for ID:', messageId);
                }
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        }
        res.status(200).json(messages);


    } catch (error) {
        console.log("Error in messsge controller :", error.messsage);
        res.status(400).json({error:"Internal server Error"})
    }

}
