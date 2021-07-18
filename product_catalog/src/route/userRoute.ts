import { Router } from "express";
const router = Router()
import { Auth } from '../middleware/auth';

/* Import controller */

import { UserController } from '../controller/userController';

router.post('/', UserController.createUser);

router.post('/login', UserController.login);

router.get('/', Auth.auth, UserController.getUser);

export default router;