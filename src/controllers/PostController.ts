import { type Request, type Response } from 'express';
import PostsDAO from '../dao/PostsDAO';
import { type Post } from '@prisma/client';
import { NotFoundException } from '../utils/errors/Exceptions';
import PostNormalizer from '../utils/normalizers/PostNormalizer';

class PostController {
  public async createPost (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const data: Post = req.body;

      const postsDao = new PostsDAO();

      const result = await postsDao.create(data);

      return res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ errorCode: 0, message: 'Internal Server Error' });
    }
  }

  public async getByCategory (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const category: string = req.params.category;
      const postsDao = new PostsDAO();

      const result: Post[] | null = await postsDao.getByCategory(category);

      if (!result?.length) throw new NotFoundException('Nenhum post da categoria informada encontrado !');

      const normalizedPostsList = result.map(post => new PostNormalizer().normalize(post));

      return res.send(normalizedPostsList);
    } catch (err) {
      console.log(err);

      if (err instanceof NotFoundException) {
        return res.status(err.statusCode).send(err.getErrorResponse());
      }

      return res.status(500).send({ errorCode: 0, message: 'Internal Server Error' });
    }
  }

  public async getAll (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const postsDao = new PostsDAO();

      const result: Post[] | null = await postsDao.getPosts();

      if (!result?.length) throw new NotFoundException('Nenhum Post encontrado');

      const normalizedPostsList = result.map(post => new PostNormalizer().normalize(post));

      return res.send(normalizedPostsList);
    } catch (err) {
      console.log(err);

      if (err instanceof NotFoundException) {
        return res.status(err.statusCode).send(err.getErrorResponse());
      }

      return res.status(500).send({ errorCode: 0, message: 'Internal Server Error' });
    }
  }

  public async getNews (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const postsDao = new PostsDAO();
      const result = await postsDao.getNews();

      if (!result) throw new NotFoundException('Nenhuma new encontrada !');

      const normalizedPost = new PostNormalizer().normalize(result);

      return res.send([normalizedPost]);
    } catch (err) {
      if (err instanceof NotFoundException) {
        return res.status(err.statusCode).send(err.getErrorResponse());
      }

      return res.status(500).send({ errorCode: 0, message: 'Internal Server Error' });
    }
  }

  public async getPostById (req: Request, res: Response): Promise<Response | null> {
    try {
      const { postId } = req.params;
      const dao = new PostsDAO();

      const result = await dao.getById(Number(postId));

      if (!result) throw new NotFoundException('Nenhum Post encontrado !');

      const normalizedPost = new PostNormalizer().normalize(result);

      return res.send(normalizedPost);
    } catch (err) {
      console.log(err);

      if (err instanceof NotFoundException) {
        return res.status(err.statusCode).send(err.getErrorResponse());
      }

      return res.status(500).send({ errorCode: 0, message: 'Internal Server Error !' });
    }
  }
}

export default new PostController();
