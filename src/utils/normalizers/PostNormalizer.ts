import { type Post } from '@prisma/client';
import { type NormalizedPost } from '../../types/PostType';

export default class PostNormalizer {
  public normalize (post: Post): NormalizedPost {
    return {
      id: post.id,
      banner: post.banner,
      title: post.title,
      resume: post.resume,
      description: post.description,
      type: post.type,
      category: post.category,
      url: post.url,
      createdAt: new Date(post.created_at).toLocaleDateString(['pt-Br']),
      shortDescription: post.short_description
    };
  }
}
