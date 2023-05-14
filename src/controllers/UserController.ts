import type { Response, Request } from 'express';
import UserDAO from '../dao/UserDAO';
import { type CreateUserType, type UpdateUserType } from '../types/UserType';
import multer from 'multer';
import MulterConfig from '../utils/MulterConfig';

class UserController {
  private readonly storage = multer.memoryStorage();

  public async createUser (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const multerConfig = new MulterConfig('avatar');

      multerConfig.getMiddleware()(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        const { name, email, password } = req.body;
        const file = req.file?.buffer;

        const userDao = new UserDAO();

        const data: CreateUserType = {
          name,
          email,
          password,
          avatar: file
        };

        const result = await userDao.create(data);

        return res.send(result);
      });
    } catch (err) {
      return res.status(500).send();
    }
  }

  public async getUserById (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query;
      const userDao = new UserDAO();

      const result = await userDao.get(Number(id));

      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  public async updateUser (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const multerConfig = new MulterConfig('avatar');

      multerConfig.getMiddleware()(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        const { age, birthDate, id } = req.body;
        const file = req.file?.buffer;

        const userDao = new UserDAO();

        const data: UpdateUserType = {
          id: Number(id),
          age: Number(age),
          birthDate: new Date(birthDate),
          avatar: file
        };

        const result = await userDao.update(data);

        return res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
}

export default new UserController();
