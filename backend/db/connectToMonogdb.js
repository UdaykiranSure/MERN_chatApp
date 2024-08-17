import mongoose from "mongoose";
const connectToMonogdb = async () =>{
    try{
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to mongodb");
    }catch(e){
        console.log("error occured connecting to db",e.message);
    }
}

export default connectToMonogdb;