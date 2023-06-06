import { type Post, type UserFavoritePosts } from '@prisma/client';
import PrismaClient from '../database/PrismaClient';

export default class FavoritePostsDAO {
  public async create (userId: number, postId: number): Promise<UserFavoritePosts> {
    return await PrismaClient.userFavoritePosts.create({
      data: {
        user_id: userId,
        post_id: postId
      }
    });
  }

  public async getUserFavoritesPosts (userId: number): Promise<Array<UserFavoritePosts & { post: Post }> | null> {
    return await PrismaClient.userFavoritePosts.findMany({
      include: { post: true },
      where: {
        user_id: userId
      }
    });
  }
}
