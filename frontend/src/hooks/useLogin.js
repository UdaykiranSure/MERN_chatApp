import { useState } from "react"
import toast from "react-hot-toast"
import { UseAuthContext } from "../context/AuthContext"

const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const {authUser,setAuthUser} = UseAuthContext();

    const login = async ({username,password}) => {
        const succes = handleInput({username,password})
        if(!succes){
            return
        }
        try {
            setLoading(true)
            const res = await fetch("./api/auth/login",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({username,password})
            })
            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user",JSON.stringify(data))
            console.log(authUser)
            setAuthUser(data)
            console.log(authUser)

        } catch (error) {
            toast.error(error.massage)
        }finally{
            setLoading(false)
        }
    }
    
    return {loading, login}
}

const handleInput = ({username, password}) =>{
    if(!username || !password){
        toast.error("Enter all fields")
        return false
    }
    return true
}


export default useLogin
