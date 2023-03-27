/**
 * Abstract Class Post
 *
 * @class Post
 */
export default abstract class Post {
  protected title: string;
  protected description: string;
  protected argument: string;
  protected createdAt: Date;

  constructor(title: string, description: string, argument: string, createdAt: Date) {
    this.title = title;
    this.description = description;
    this.argument = argument;
    this.createdAt = createdAt;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getArgument(): string {
    return this.argument;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * @override
   */
  public getStructured(): Object {
    return {
      title: this.title,
      description: this.description,
      argument: this.argument,
      createdAt: this.createdAt
    };
  }
}
