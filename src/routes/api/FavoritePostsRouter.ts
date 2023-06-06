import { Router } from 'express';
import FavoritePostsController from '../../controllers/FavoritePostsController';

const FavoritePostRouter = Router();

FavoritePostRouter.route('/create').put(FavoritePostsController.create.bind(FavoritePostsController));
FavoritePostRouter.route('/:userId').get(FavoritePostsController.getFavoritesPosts.bind(FavoritePostsController));

export default FavoritePostRouter;
