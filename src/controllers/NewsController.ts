import { Request, Response } from 'express';
import News from '../models/News';

class NewsController {
  async getLastNews(req: Request, res: Response): Promise<Object> {
    return new Promise(resolve => {
      setTimeout(() => {
        const news: News = new News('Title', 'description', 'This is an argument', new Date());
        return resolve(res.send(news.getStructured()));
      }, 1000);
    });
  }
}

export default new NewsController();
