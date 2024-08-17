import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UseAuthContext } from "./AuthContext.jsx";

const SocketContext = createContext();

export const useSocketContext = () =>{
    return useContext(SocketContext);
}
export const SocketContextProvider = ({children}) => {  
    const [socket,setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = UseAuthContext();

    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:3000",{
                query:{
                    userId:authUser._id
                }
            });
            console.log(socket)
            setSocket(socket)
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers([users])
            })
            
        }else{
            if (socket){
                socket.close();
                setSocket(null)
            }
        }
    },[authUser])
    

    return (
    <SocketContext.Provider value={{socket,onlineUsers}}>
        {children}
    </SocketContext.Provider>
)}