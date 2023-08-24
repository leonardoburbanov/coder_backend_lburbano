import usersService from "../services/users.service.js";


class UsersController {
    updateUserRol = async (req, res) => {
        const uidUser = req.params.uidUser;
        try {
            let userModified = await usersService.updateUserRol(uidUser)
            res.send({userModified})
        }catch(error){
            res.status(400).send({error:error.message});
        }
    }
    deleteUser = async (req, res) => {
        const uidUser = req.params.uidUser;
        try {
            let userDeleted = await usersService.deleteUserById(uidUser)
            res.send({userDeleted})
        }catch(error){
            res.status(400).send({error:error.message});
        }
    }

    uploadDocument = async (req, res) => {
        const { uid } = req.params;
        const { file } = req;

        try {
            const user = await usersService.getUserById(uid);

            // Determine the subfolder based on the fieldname
            let subfolder = 'documents'; // Default subfolder
            if (file.fieldname === 'profileImage') {
                subfolder = 'profiles';
            } else if (file.fieldname === 'productImage') {
                subfolder = 'products';
            }

            // Update the user's documents and set the reference
            user.documents.push({
                name: file.originalname,
                reference: `/${subfolder}/${file.filename}`
            });

            await user.save();

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}
export default UsersController;