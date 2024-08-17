import { useState } from "react"
import toast  from "react-hot-toast"
import { UseAuthContext } from "../context/AuthContext.jsx"

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const {authUser,setAuthUser} = UseAuthContext();

    const signup = async ({fullname,username,password, confirmPassword,gender}) =>{
        console.log(1)
        const success = handleInputErrors({fullname,username,password, confirmPassword,gender})
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullname, username, password, confirmPassword, gender }),
			});
            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
            console.log(authUser)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    
    return [loading,signup]

}

export default useSignup;

const handleInputErrors = ({fullname,username,password, confirmPassword,gender}) => {
    console.log(2)
    if (!fullname || !username || !password || !confirmPassword ||  !gender){
        toast.error('Enter all fields')
        return false
    }
    if(password.lenght < 6){
        toast.error('password must be atlest 6 characters')
        return false
    }
    if(password != confirmPassword ){
        toast.error('passwords does not match')
        return false
    }
    
    return true;

}