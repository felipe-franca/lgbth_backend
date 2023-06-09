import { Router } from 'express';
import FavoritePostsController from '../../controllers/FavoritePostsController';

const FavoritePostRouter = Router();

FavoritePostRouter.route('/create').put(FavoritePostsController.create.bind(FavoritePostsController));
FavoritePostRouter.route('/:userId').get(FavoritePostsController.getFavoritesPosts.bind(FavoritePostsController));
FavoritePostRouter.route('/remove').delete(FavoritePostsController.unfavoritePost.bind(FavoritePostsController));

export default FavoritePostRouter;
