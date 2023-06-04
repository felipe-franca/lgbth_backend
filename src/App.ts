import express, { type Application, json } from 'express';
import UserRouter from './routes/api/UserRouter';
import UsefullyPhonesRouter from './routes/api/UsefullyPhonesRouter';
import PostRouter from './routes/api/PostRouter';

class AppController {
  app: Application;

  constructor () {
    this.app = express();
    this.config(this.app);
    this.setupRoutes(this.app);
  }

  config (app: express.Application): void {
    app.use(json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  }

  setupRoutes (app: express.Application): void {
    app.use('/user', UserRouter);
    app.use('/usefully-phones', UsefullyPhonesRouter);
    app.use('/posts', PostRouter);
  }
}

export default new AppController().app;
