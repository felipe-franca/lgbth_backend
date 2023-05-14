import { type RequestHandler, type Request } from 'express';
import multer, { type FileFilterCallback, type Multer, type StorageEngine } from 'multer';
import path from 'path';

export default class MulterConfig {
  private readonly storage: StorageEngine;
  private readonly fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void;
  private readonly upload: RequestHandler;

  constructor (formFileName: string) {
    this.storage = multer.memoryStorage();

    this.fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        cb(new Error('Only images are allowed!'));
      }
      cb(null, true);
    };

    this.upload = multer({
      storage: this.storage,
      fileFilter: this.fileFilter
    }).single(formFileName);
  }

  public getMiddleware (): RequestHandler {
    return this.upload;
  }
}
