import { Router } from 'express';
import UsersController from "../controllers/users.controllers.js";

const router = Router();

const usersController = new UsersController();

router.put("/:uidUser", usersController.updateUserRol);
router.delete("/:uidUser", usersController.deleteUser);

export default router;