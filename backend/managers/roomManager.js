import { Socket } from "socket.io";
import { User } from "./userManager";
let GLOBAL_ROOM_ID  = 1
class Room{
    user1;
    user2;
}
export class RoomManager{
    rooms
    constructor(){
        this.rooms = new Map()
     }

     creatRoom(user1,user2){
        const roomId = this.generateId().toString();
        this.rooms.set(roomId,{
            user1,
            user2
        })
        console.log("creating room")

        user1.emit("send-offer",{
            roomId  
        })
        setTimeout(()=>{
            user2.emit("send-offer",{
                roomId
            })
        },5000)
        
        
     }

     onOffer(roomId,sdp,socketId){
        console.log("sending offer to user2",sdp)
        console.log(roomId)
        const room = this.rooms.get(roomId)
        const receivingUser = room?.user1.id === socketId? room?.user2 : room?.user1
        receivingUser?.emit("offer",{
            roomId,
            sdp
        })
     }

     onAnswer(roomId,sdp,socketId){
        console.log(sdp)
        const room = this.rooms.get(roomId)
        const receivingUser = room?.user1.id === socketId? room?.user2 : room?.user1
        console.log(receivingUser,"sending answert o user 1")
        receivingUser?.emit("answer",{
            roomId,
            sdp,
            socketId: receivingUser.id
        })
     }

     onIceCandidates(roomId,socketId,candidate,type){
        const room = this.rooms.get(roomId)
        const receivingUser = room?.user1.id === socketId? room?.user2 : room?.user1
        receivingUser?.emit("add-ice-candidates",({candidate,type}))
     }

     generateId(){
        return GLOBAL_ROOM_ID++;
     }
}