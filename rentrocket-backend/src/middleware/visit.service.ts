import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}

  async logVisit(endpoint: string, method: string, params: any) {
    await this.prisma.visit.create({
      data: {
        endpoint,
        method,
        params
      }
    });
  }
}