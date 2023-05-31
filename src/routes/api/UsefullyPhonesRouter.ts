import { Router } from 'express';
import UsefullyPhonesController from '../../controllers/UsefullyPhoneController';

const router = Router();

router.route('/').get(UsefullyPhonesController.getPhones.bind(UsefullyPhonesController));

export default router;
