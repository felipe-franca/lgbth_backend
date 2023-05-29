import { type User } from '@prisma/client';
import type { Request, Response } from 'express';
import UserDAO from '../dao/UserDAO';
import { type CredentialsType, type CreateUserType, type UpdateUserType } from '../types/UserType';
import { BadRequestException, InternalServerError, InvalidCredentialsException, NotFoundException } from '../utils/errors/Exceptions';

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

      if (!result) throw new NotFoundException('Usuário não encontrado');

      const userResponseData: UserResponseType = this.getParsedResponse(result);

      return res.send(userResponseData);
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) {
        return res.status(err.statusCode).json(err.getErrorResponse());
      }

      const defaultError = new InternalServerError(err);

      return res.status(defaultError.statusCode).json(defaultError.getErrorResponse());
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

  public async sigIn (req: Request, res: Response): Promise<Response | undefined> {
    const data: CredentialsType = req.body;

    try {
      if (!data.email || !data.password) throw new BadRequestException('Email ou senha Inválidos');

      const userDao = new UserDAO();
      const result = await userDao.getByEmail(data.email);

      if (!result) throw new NotFoundException('Usuário não encontrado');

      if (data.password !== result.password) throw new InvalidCredentialsException('Email ou senha Inválidos');

      return res.send(result);
    } catch (err) {
      if (err instanceof NotFoundException) {
        res.status(err.statusCode).json(err.getErrorResponse());
      } else if (err instanceof BadRequestException) {
        return res.status(err.statusCode).json(err.getErrorResponse());
      } else if (err instanceof InvalidCredentialsException) {
        return res.status(err.statusCode).json(err.getErrorResponse());
      } else {
        return res.status(500).send({ erroCode: 0, message: 'Internal Server Error' });
      }
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
