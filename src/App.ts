import express, { Application, json } from 'express';
import NewsRouter from './routes/api/NewsRouter';

class AppControoller {
  app: Application

  constructor() {
    this.app = express();
    this.config(this.app);
    this.setupRoutes(this.app);
  }

  config(app: express.Application): void {
    app.use(json());
  }

  setupRoutes(app: express.Application): void {
    app.use('/news', NewsRouter);
  }
}

export default new AppControoller().app;
