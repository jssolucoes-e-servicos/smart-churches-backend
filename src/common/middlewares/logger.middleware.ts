import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'src/modules/logger/services/logger.service';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private _name = this.constructor.name;
  constructor(private readonly _logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.get('origin') || req.get('referer') || req.get('host') || 'unknown';
    this._logger.setRequest(origin, req.method, req.originalUrl);

    //this._logger.setLog(this._name, `METHOD: ${req.method}, ORIGIN: ${origin} , PATH: ${req.originalUrl}`);
    if (next) {
      next();
    }
  }
}
