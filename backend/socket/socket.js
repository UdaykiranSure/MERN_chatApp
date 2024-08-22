import { Server } from "socket.io";
import express from "express";
import http from "http";
import { UserManger } from "../managers/userManager";

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5000"],
        methods:["GET","POST"]
    }
});

export const getReceiverSocketId = (userId) =>{
    return userSocketMap[userId]
}

const userSocketMap = {}
const userManger = new UserManger()
io.on("connection",(socket) =>{
    console.log("a user connected ",socket.id);
    const userId = socket.handshake.query.userId;

    if(userId!= "undefined") userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("call-user",({from,to})=>{
        const reciever = userSocketMap[to]
        io.to(reciever).emit("receive-call",{from,to})
    })

    socket.on("accept-call",({from,to})=>{
        user1 = userSocketMap[from]
        user2 = userSocketMap[to]
        userManger.connectCall(user1,user2,socket)
    })

    socket.on("disconnected",() =>{
        console.log("user disconnected ",socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})




export {server,app,io}