import { type User } from '@prisma/client';
import type { Request, Response } from 'express';
import UserDAO from '../dao/UserDAO';
import { type CreateUserType, type UpdateUserType } from '../types/UserType';

interface UserResponseType {
  id: string | number
  name: string
  email: string
  age: number | string
  avatar: string | undefined | null
  birthDate: string | undefined | null
}
class UserController {
  public async createUser (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const data: CreateUserType = req.body;
      const userDao = new UserDAO();

      const result = await userDao.create(data);

      const userResponseData: UserResponseType = this.getParsedResponse(result);

      return res.send(userResponseData);
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  public async getUserById (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query;
      const userDao = new UserDAO();

      const result = await userDao.get(Number(id));

      if (result) {
        const userResponseData: UserResponseType = this.getParsedResponse(result);
        return res.send(userResponseData);
      } else throw new Error();
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  public async updateUser (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const data: UpdateUserType = req.body;
      const userDao = new UserDAO();

      if (data.birthDate) {
        data.birthDate = new Date(data.birthDate);
      }

      const result = await userDao.update(data);

      const userResponseData: UserResponseType = this.getParsedResponse(result);

      return res.send(userResponseData);
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  public getParsedResponse (user: User): UserResponseType {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: Number(user.age),
      avatar: user.avatar,
      birthDate: user.birth_date?.toISOString()
    };
  }
}

export default new UserController();
