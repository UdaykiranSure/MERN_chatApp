import { useState } from "react";
import toast from "react-hot-toast";
import { UseAuthContext } from "../context/AuthContext.jsx";
const useLogout = () => {

    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = UseAuthContext();
    const logout = async () =>{
        try{
            setLoading(true)
            const res = await fetch("./api/auth/logout",{
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            
            const data = res.json;
            if(data.error){
                throw new Error(data.error)
            }
            
            localStorage.removeItem("chat-user")
            setAuthUser(null)
    
    }catch(error){
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
    }
  return {loading,logout}
}

export default useLogout
