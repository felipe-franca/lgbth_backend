import { Router } from 'express';
import UserController from '../../controllers/UserController';

const router = Router();

router.route('/create').post(UserController.createUser);
router.route('/get').get(UserController.getUserById);
router.route('/update').put(UserController.updateUser);

export default router;
