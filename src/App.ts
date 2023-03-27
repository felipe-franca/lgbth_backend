import express, { Request, Response, Application, json } from 'express';


class AppControoller {
  app: Application

  constructor() {
    this.app = express();
    this.config(this.app);
  }
  config(app: express.Application) {
    app.use(json());
  }
}

export default new AppControoller().app;
