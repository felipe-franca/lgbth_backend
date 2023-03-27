import { Router } from 'express';
import NewsController from '../../controllers/NewsController';

const router = Router();

router.route('/latest').get(NewsController.getLastNews);

export default router;
