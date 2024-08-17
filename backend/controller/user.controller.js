import User from "../models/user.model.js";

const getUsersforSidebar = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedUserId}}).select("-password");
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("error in user controller ", error.message)
        res.status(500).json({error:"Internal server error"})
    }
};
export default getUsersforSidebar;