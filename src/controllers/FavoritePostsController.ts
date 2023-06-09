import { type Request, type Response } from 'express';
import FavoritePostsDAO from '../dao/FavoritePostsDAO';
import UserDAO from '../dao/UserDAO';
import { NotFoundException } from '../utils/errors/Exceptions';
import PostsDAO from '../dao/PostsDAO';
import PostNormalizer from '../utils/normalizers/PostNormalizer';

class FavoritePostsController {
  public async create (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { userId, postId } = req.body;
      const userDao = new UserDAO();

      if (!await userDao.get(Number(userId))) {
        throw new NotFoundException('Usuário inexistente');
      }

      const postDao: PostsDAO = new PostsDAO();

      if (!await postDao.getById(Number(postId))) {
        throw new NotFoundException('Post não inexistente !');
      }

      const favPostDao = new FavoritePostsDAO();

      const result = await favPostDao.create(Number(userId), Number(postId));

      res.send(result);
    } catch (error) {
      console.log(error);

      if (error instanceof NotFoundException) {
        return res.status(error.statusCode).send(error.getErrorResponse());
      }

      return res.status(500).send({ errorCode: 0, message: 'Internal Server Error!' });
    }
  }

  public async getFavoritesPosts (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const userId = Number(req.params.userId);
      const dao = new FavoritePostsDAO();

      const result = await dao.getUserFavoritesPosts(userId);

      if (!result) {
        throw new NotFoundException('Nenhum Post favoritado');
      }

      const normalizedFavoritePosts = result.map(el => new PostNormalizer().normalize(el.post));

      return res.send(normalizedFavoritePosts);
    } catch (err) {
      if (err instanceof NotFoundException) {
        return res.status(err.statusCode).send(err.getErrorResponse());
      }

      return res.status(500).send({ errorCode: 0, message: 'Internal Server Error' });
    }
  }

  public async unfavoritePost (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { userId, postId } = req.body;
      const dao = new FavoritePostsDAO();
      const result = await dao.remove(userId, postId);

      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ errorCode: 0, message: 'Internal Server Error' });
    }
  }
}

export default new FavoritePostsController();
