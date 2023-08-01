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
}
export default new UsersDaoMemory();