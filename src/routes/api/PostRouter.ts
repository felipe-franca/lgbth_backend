import { Router } from 'express';
import Controller from '../../controllers/PostController';

const postRouter = Router();

postRouter.route('/create').post(Controller.createPost.bind(Controller));
postRouter.route('/category/:category').get(Controller.getByCategory.bind(Controller));
postRouter.route('/posts-list').get(Controller.getAll.bind(Controller));

export default postRouter;
