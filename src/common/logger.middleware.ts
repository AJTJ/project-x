import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OtherLog implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('First middleware');
    next();
  }
}

export const LoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Request: ', req.body);
  console.log('Response: ');
  next();
};
