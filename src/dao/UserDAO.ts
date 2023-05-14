import { type User } from '@prisma/client';
import PrismaClient from '../database/PrismaClient';
import type CreateUserType from '../types/CreateUserType';

export default class UserDAO {
  public async get (id: number): Promise<User | null> {
    return await PrismaClient.user.findUnique({
      where: {
        id
      }
    });
  }

  public async create ({ name, email, password }: CreateUserType): Promise<User> {
    return await PrismaClient.user.create({
      data: {
        name,
        email,
        password
      }
    });
  }
}
