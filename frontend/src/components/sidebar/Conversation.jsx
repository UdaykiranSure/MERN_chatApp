import useConversation from "../../store/useConversations.js"
import { useSocketContext } from "../../context/SocketContext.jsx";

const Conversation = ({conversation,emoji,lastIdx}) => {
  const {onlineUsers} = useSocketContext();
  const {selectedConversation,setSelectedConversation} = useConversation();
  const isOnline = onlineUsers.includes(conversation._id)
  const isSelected = selectedConversation?selectedConversation._id === conversation._id:false 
  console.log(conversation._id,isOnline)
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 routded pd-2 py-1 cursor-pointer ${isSelected? "bg-sky-500":""}
    `} onClick = {() =>setSelectedConversation(conversation)}>
        <div className={`profile ${isOnline? "online":""}`}>
            <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt='user avatar'/>
            </div>
        </div>
        <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">{conversation.fullname}</p>
                <span className="text-sm">{emoji}</span>
            </div>
        </div>
    </div>
    {!lastIdx && <div className="divider my-0 py-0 h-1"/>}
    </>
  )
}

export default Conversation
