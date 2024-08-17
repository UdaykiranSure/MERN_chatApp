import Message from "./Message"
import useGetMessages from "../../hooks/useGetMessages.js"
import useListenMessages from "../../hooks/useListenMessage.js"
import { useEffect,useRef } from "react"
const Messages = () => {
  const {messages,loading} = useGetMessages()
  const lastMsgRef = useRef();
    useListenMessages();
  useEffect(() => {
		setTimeout(() => {
			lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);
  return (
    <div className="flex-1 px-4 overflow-auto">
      {loading && <span className="loading loading-spinner"></span>}
      {!loading && messages.length === 0 && <p className=" text-center">Send a message to start the conversation</p>} 
      {!loading && messages.length> 0 && messages.map((message) => <div key = {message._id} ref = {lastMsgRef}> <Message message = {message}  /> </div>)}
    </div>
  )
}

export default Messages
