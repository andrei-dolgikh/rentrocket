import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CommentsCreateGuard extends ThrottlerGuard {
  getOptions(): any {
    return {
      ttl: 3600, 
      limit: 1,
    };
  }
}