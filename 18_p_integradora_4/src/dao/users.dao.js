import usersModel from "./models/User.model.js";

class UsersDaoMemory {
    updateUserRol = async(uid_user)=>{
        let user_found = await usersModel.find({_id:uid_user})
        let new_rol = "premium"
        if(user_found[0].rol=="premium"){
            new_rol = 'user'
        }
        let newUser = {
            rol : new_rol
        }
        if(user_found && user_found[0].rol !='admin'){
            
            let result = await usersModel.updateOne({_id:uid_user},{$set:newUser})
            let user_found = await usersModel.find({_id:uid_user})
            return user_found;   
        }else{
            throw new Error('Error in update operation. User not found or incorrect rol.')
            return;
        }
    }
    getUserById = async(uid_user)=>{
        let user_found = await usersModel.find({_id:uid_user})
        if(user_found){
            return user_found;   
        }else{
            throw new Error('Error in search operation. User not found.')
            return;
        }
    }

    deleteUserById = async(uid_user)=>{
        let user_found = await usersModel.find({_id:uid_user})
        if(user_found){
            await usersModel.deleteOne({_id:uid_user})
            return user_found;   
        }else{
            throw new Error('Error in search operation. User not found.')
            return;
        }
        
    }
    updateUserLastConnectionByEmail = async (userEmail) => {
        try {
            const currentTimestamp = new Date();
            await usersModel.updateOne({ email: userEmail }, { $set: { last_connection: currentTimestamp } });
            const updatedUser = await usersModel.findOne({ email: userEmail });
            return updatedUser;
        } catch (error) {
            throw new Error('Error in update operation. User not found or unable to update last_connection.');
        }
    }
}
export default new UsersDaoMemory();