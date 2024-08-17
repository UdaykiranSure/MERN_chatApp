import React from 'react'
import { UseAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../util/extractTime'

const Message = (message) => {
  const {authUser} = UseAuthContext();
  const  fromMe = authUser._id === message.message.senderId
  const chatClassName = fromMe? "chat-end": "chat-start"
  const bgColor = fromMe? "bg-sky-500":""
  const msg = message.message.message
  const time = extractTime(message.message.createdAt)
  return (
    <div className={`chat ${chatClassName}`}>
      <div className={`chat-bubble text-white ${bgColor}`}>{msg}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{time}</div>
    </div>
  )
}

export default Message
