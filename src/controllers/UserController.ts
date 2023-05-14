import type { Response, Request } from 'express';
import UserDAO from '../dao/UserDAO';
import type CreateUserType from '../types/CreateUserType';

class UserController {
  public async createUser (req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body as CreateUserType;
      const userDao = new UserDAO();
      const result = await userDao.create(userData);

      console.log(result);

      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
}

export default new UserController();
