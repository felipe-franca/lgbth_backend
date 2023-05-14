import { Router } from 'express';
import UserController from '../../controllers/UserController';

const router = Router();

router.route('/create').post(UserController.createUser);

export default router;
