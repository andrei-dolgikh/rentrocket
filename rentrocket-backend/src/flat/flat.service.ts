import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FlatDto } from './flat.dto';
import { Status } from '@prisma/client';

export interface DashboardStatInterface {
  id: string;
  comments: number;
  timestamp: Date;
  views: number;
  commentsDelta?: number;
  viewsDelta?: number;
}

export interface DashboardLinksStatsInterface {
  id: string;
  timestamp: Date;
  flatId: string;
  available: boolean;
}

@Injectable()
export class FlatService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.flat.findUnique({
      select: {
        id: true,
        name: true,
        description: true,
        viewsCount: true,
        commentsCount: true,
        usersCount: true,
        order: true,
        iconUrl: true,
        recommended: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
        tags: true,
        price: true
      },
      where: {
        id
      }
    })
  }

  async getCatalog() {
    return this.prisma.flat.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        iconUrl: true,
        viewsCount: true,
        commentsCount: true,
        usersCount: true,
        recommended: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
        tags: true,
        price: true
      },
      where: {
        status: Status.ACTIVE
      }
    })
  }

  async create(dto: FlatDto, creatorId: string) {
    dto.status = Status.ACTIVE
    dto.viewsCount = 0
    dto.commentsCount = 0
    dto.usersCount = 0
    dto.rating = 0
    dto.order = 0

    return this.prisma.flat.create({
      data: {
        ...dto,
        tags: {
          connect: dto.tags?.map((tag) => ({ id: tag.id })),
        },
        creator: {
          connect: {
            id: creatorId
          }
        }
      }
    })
  }

  async update(dto: Partial<FlatDto>, flatId: string, userId: string) {
    const flat = await this.prisma.flat.findUnique({
      where: {
        id: flatId,
      },
    });
  
    if (!flat) {
      throw new NotFoundException('Flat not found');
    }
  
    const updatedFlat = await this.prisma.flat.update({
      where: {
        id: flatId,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
        tags: {
          set: dto.tags?.map((tag) => ({ id: tag.id })),
        },
      },
    });
  
    await this.prisma.flatHistory.create({
      data: {
        flatId: flatId,
        authorId: userId,
        changes: JSON.stringify(dto),
        updatedAt: new Date(),
      },
    });
  
    return updatedFlat;
  }

  async updateImage(flatId: string, url: string, userId: string) {
    await this.prisma.flat.update({
      where: { id: flatId },
      data: { iconUrl: url },
    });
  }


  async getStatistics() {
    let dashboardStats = await this.prisma.dashboardStats.findMany({
      select: {
        id: true,
        comments: true,
        timestamp: true,
        views: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 400
    }) as DashboardStatInterface[];
    
    dashboardStats = dashboardStats.reverse()

    // create delta values for comments and views, i need calculate percents change for last month
    // for (let i = 1; i < dashboardStats.length; i++) {
    //   dashboardStats[i].commentsDelta = dashboardStats[i].comments - dashboardStats[i - 1].comments;
    //   dashboardStats[i].viewsDelta = dashboardStats[i].views - dashboardStats[i - 1].views;
    // }

    return {
      dashStat: dashboardStats,
      linksStat: []
    };
  }

  async delete(flatsIds: string[]) {
    await this.prisma.flat.updateMany({
      where: {
        id: {
          in: flatsIds
        }
      },
      data: {
        status: Status.INACTIVE
      }
    })

  }
}
