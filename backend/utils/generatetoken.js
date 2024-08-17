import jwt from "jsonwebtoken";

const generateTokenandSetCokie = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true, //prevent xss cross site attacks
        sameSite: "strict"

    });
};
export default generateTokenandSetCokie;