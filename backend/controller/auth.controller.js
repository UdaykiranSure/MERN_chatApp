import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenandSetCokie from "../utils/generatetoken.js";
export const signin = async (req,res) => {
    console.log("0")
    try{    
        console.log("pass0")
        const {fullname,username, password, confirmPassword, gender} = req.body;

        if (password!== confirmPassword){
            return res.status(400).json({error:"password doesn't match"});
        }
        console.log("pass1")
        const user = await User.findOne({username:username})
        if (user){
            return res.status(400).json({error: "user name already exists"});
        }
        console.log("pass2")
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //Profic pic links
        //https://avatar.iran.liara.run/public/boy

        const boypic = "https://avatar.iran.liara.run/public/boy/username?username={"+username+"}"
        const girlpic = "https://avatar.iran.liara.run/public/boy/username?username={"+username+"}"
        const newUser = new User({
            fullname:fullname,
            username:username,
            password: hashedPassword,
            gender:gender,
            profilePic: gender === "male"? boypic:girlpic
        })
        if(newUser){
        generateTokenandSetCokie(newUser._id,res)
        await newUser.save()

        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
           })
        }else{
            res.status(400).json({eroor:"invalid user data"});
        }

       
    }
    catch(error){
        console.log("error in signin controller",error.message)
        res.status(500).json({error:"Internal server error"})
    }


}
export const login =async  (req,res) =>{
    try {
        const {username, password} = req.body
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect){
           return  res.status(400).send("Invalid username or password")
        }
        console.log(user._id)
        generateTokenandSetCokie(user._id,res);
        
        res.status(200).json({
            _id:user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic : user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(400).json({error:"internal server Error"})
    }
}
export const logout = (req, res) =>{
    try {
        res.cookie("jwt","",{maxAge: 0} );
        res.status(200).json({message: "logged out successfully"});
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(400).json({error: "error in internal server"});
    }
   
}