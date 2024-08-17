import { useState } from 'react'
import {IoSearchSharp} from 'react-icons/io5'
import useConversation from '../../store/useConversations'
import toast from 'react-hot-toast'
import useGetConversation from '../../hooks/useGetConversations'
const SearchInput = () => {
  const [search,setSearch] = useState("")
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return
    if(search.length < 3){
      toast.error("Search Input should be atleast 3 characters")
      return
    }

    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()))
    
    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }
    else{
      toast.error("No user found")
      return  
    }
  
  }

  return (
   
    <form className="flex items-center gap-2" onSubmit={handleSubmit}> 
        <input type="text" placeholder="Search.." className="input input-bordered rounded-full" 
        value={search} 
        onChange={(e)=>setSearch(e.target.value)}/>
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput
