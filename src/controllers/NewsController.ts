import { Request, Response } from 'express';
import NewsDAO from '../dao/NewsDAO';

class NewsController {
  async getLastNews(req: Request, res: Response): Promise<Object> {
    const newsDao = new NewsDAO();
    const news = await newsDao.getLastestNews();

    return res.send(news);
  }
}

export default new NewsController();
