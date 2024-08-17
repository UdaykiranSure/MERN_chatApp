import {BsSend} from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'
import { useState } from 'react';
const MessageInput =  () => {
	const {loading, sendMessage} = useSendMessage();
	const [input, setInput] = useState("");
	const handleSubmit = async (e) =>{
		e.preventDefault();
		if(!input) return;
 		await sendMessage(input)	
		setInput("")
	}
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
		<div className='w-full relative'>
			<input
				type='text'
				className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
				placeholder='Send a message'
				value={input}
				onChange={(e) => (setInput(e.target.value))}
			/>
		    	<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
				{loading? <span className='loading loading-spinner'></span>:<BsSend />}
			</button>
		</div>
	</form>
  )
}

export default MessageInput
