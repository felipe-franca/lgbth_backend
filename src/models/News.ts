import Post from './Post';

/**
 * Class News
 *
 * @class News
 * @extends Post
 */
export default class News extends Post {
  constructor(title: string, description: string, argument: string, createdAt: string) {
    super(title, description, argument, createdAt);
  }
}
