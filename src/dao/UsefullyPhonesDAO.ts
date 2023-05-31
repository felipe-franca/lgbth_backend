import { type UsefullyPhone } from '@prisma/client';
import PrismaClient from '../database/PrismaClient';

export default class UsefullyPhonesDAO {
  public async getPhones (): Promise<UsefullyPhone[] | null> {
    return await PrismaClient.usefullyPhone.findMany();
  }
}
