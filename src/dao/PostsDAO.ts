import PrismaClient from '../database/PrismaClient';
import { type Post } from '@prisma/client';
import { type CreatePostType } from '../types/PostType';

export default class PostsDAO {
  public async get (): Promise<Post[] | null> {
    return await PrismaClient.post.findMany();
  }

  public async getByCategory (category: string): Promise<Post[] | null> {
    return await PrismaClient.post.findMany({
      where: {
        category
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  public async getById (id: number): Promise<Post | null> {
    return await PrismaClient.post.findFirst({
      where: {
        id
      }
    });
  }

  public async create ({
    description,
    type,
    category,
    banner,
    resume,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    short_description,
    title
  }: CreatePostType): Promise<Post | null> {
    return await PrismaClient.post.create({
      data: {
        banner,
        type,
        category,
        resume,
        short_description,
        title,
        description
      }
    });
  }

  public async update (id: number, {
    description,
    type,
    category,
    banner,
    resume,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    short_description,
    title
  }: CreatePostType): Promise<Post | null> {
    return await PrismaClient.post.update({
      where: {
        id
      },
      data: {
        banner,
        type,
        category,
        resume,
        short_description,
        title,
        description
      }
    });
  }
}
