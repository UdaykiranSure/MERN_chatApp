import { useState,useEffect } from "react";
import useConversation from "../store/useConversations"
import toast from "react-hot-toast";

const useGetMessages = () =>{
    const {messages,setMessages,selectedConversation} = useConversation();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const getMessages = async ()=>{
            setLoading(true)
            try {
                const res = await fetch(`/api/message/${selectedConversation._id}`)
                const data = await res.json()
                if(data.error){
                    throw new Error(data.error)
                }
                setMessages(data)
                
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages()
    },[selectedConversation?._id])

    return {loading,messages};
}

export default useGetMessages;