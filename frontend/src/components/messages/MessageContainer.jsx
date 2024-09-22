import { useEffect } from "react";
import useConversation from "../../store/useConversations.js";
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import {TiMessages} from 'react-icons/ti'
import { Landing } from "../callMenu/Landing.jsx";
const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const [call,setCall] = useState(false)
    useEffect(() =>{
        return setSelectedConversation(null);
    },[])
    const handleCall = ()=>{
        setCall(True)
    }

  return (
    <div className='md:min-w-[450px] flex flex-col'>
        { selectedConversation ?  
		<>	
            <div className="bg-slate-500 flex gap-2 items-center  routded   cursor-pointer">
            <div className='   mb-2'>
                    <div className='w-12 rounded-full'>
                        <img alt='Tailwind CSS  bubble component' src ='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'  />
                    </div> 
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">{selectedConversation.fullname}</p>    
                </div>
            </div>
            <div className="flex flex-col">
                <button onClick={()=>handleCall()}>Call</button>
            </div>
            </div>

  			{call?<Landing/>:(<><Messages/><MessageInput/></>)}
            
  		</> :<NoChatSelected/> }
  	</div>
  );
};

export default MessageContainer

const NoChatSelected = () => {
    
	return (
		
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋  ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
