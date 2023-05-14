import express, { type Application, json } from 'express';
import UserRouter from './routes/api/UserRouter';

class AppControoller {
  app: Application;

  constructor () {
    this.app = express();
    this.config(this.app);
    this.setupRoutes(this.app);
  }

  config (app: express.Application): void {
    app.use(json());
    app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes (app: express.Application): void {
    app.use('/user', UserRouter);
  }
}

export default new AppControoller().app;
