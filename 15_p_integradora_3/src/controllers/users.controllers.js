import usersService from "../services/users.service.js";


class UsersController {
    updateUserRol= async (req, res) => {
        const uidUser = req.params.uidUser;
        //try {
            let userModified = await usersService.updateUserRol(uidUser)
            res.send({userModified})
        /*}catch(error){
            res.status(400).send({error:error.message});
        }*/
    }
}
export default UsersController;