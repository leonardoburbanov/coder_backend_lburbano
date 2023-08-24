import { Router } from 'express';
import UsersController from "../controllers/users.controllers.js";

const router = Router();

const usersController = new UsersController();

router.put("/premium/:uidUser", usersController.updateUserRol);
router.delete("/:uidUser", usersController.deleteUser);

// Define storage with dynamic destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationFolder = 'documents'; // Default folder is 'documents'

        if (file.fieldname === 'profileImage') {
            destinationFolder = 'profiles';
        } else if (file.fieldname === 'productImage') {
            destinationFolder = 'products';
        }

        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        const uniqueFileName = Date.now() + '-' + file.originalname;
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage: storage });



router.post("/:uid/documents", upload.single('document'), usersController.uploadDocument);




export default router;
