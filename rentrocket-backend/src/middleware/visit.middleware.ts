import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { VisitsService } from './visit.service';

@Injectable()
export class VisitsMiddleware implements NestMiddleware {
  constructor(private readonly visitsService: VisitsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const endpoint = req.originalUrl;
    const method = req.method;
    const params = {
      params: req.params,
      query: req.query,
      body: req.body
    };

    await this.visitsService.logVisit(endpoint, method, params);

    next();
  }
}