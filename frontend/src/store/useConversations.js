import {create} from 'zustand'

const useConversation = create((set)=>({
    selectedConversation:null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages: (messages) => set({messages}),
    onCall:false,
    setCall:(onCall)=>set({onCall})
}))

export default useConversation;