import { Router } from 'express';
import UserController from '../../controllers/UserController';

const router = Router();

router.route('/create').post(UserController.createUser.bind(UserController));
router.route('/get').get(UserController.getUserById.bind(UserController));
router.route('/update').put(UserController.updateUser.bind(UserController));
router.route('/sign-in').post(UserController.sigIn.bind(UserController));

export default router;
