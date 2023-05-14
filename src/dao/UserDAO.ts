import { type User } from '@prisma/client';
import PrismaClient from '../database/PrismaClient';
import { type CreateUserType, type UpdateUserType } from '../types/UserType';

export default class UserDAO {
  public async get (id: number): Promise<User | null> {
    return await PrismaClient.user.findUnique({
      where: {
        id
      }
    });
  }

  public async create (data: CreateUserType): Promise<User> {
    return await PrismaClient.user.create({
      data
    });
  }

  public async update ({ id, age, avatar, birthDate }: UpdateUserType): Promise<User> {
    return await PrismaClient.user.update({
      where: {
        id
      },
      data: {
        age,
        avatar,
        birth_date: birthDate
      }
    });
  }
}
