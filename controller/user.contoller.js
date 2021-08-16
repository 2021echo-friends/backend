import User from "../models/user"
export const getUser = async (email)=>{
    return await User.findOne({email})
}