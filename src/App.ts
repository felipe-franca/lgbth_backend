import express, { type Application, json } from 'express';
import UserRouter from './routes/api/UserRouter';
import UsefullyPhonesRouter from './routes/api/UsefullyPhonesRouter';

class AppControoller {
  app: Application;

  constructor () {
    this.app = express();
    this.config(this.app);
    this.setupRoutes(this.app);
  }

  config (app: express.Application): void {
    app.use(json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes (app: express.Application): void {
    app.use('/user', UserRouter);
    app.use('/usefully-phones', UsefullyPhonesRouter);
  }
}

export default new AppControoller().app;
