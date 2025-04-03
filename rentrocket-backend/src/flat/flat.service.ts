import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FlatDto } from './flat.dto';
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
        order: true,
        iconUrl: true,
        createdAt: true,
        updatedAt: true,
        tags: true,
        address: true,
        entergroup: true,
        chambres: true,
        size: true
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
        createdAt: true,
        updatedAt: true,
        tags: true,
      }
    })
  }

  async create(dto: FlatDto, creatorId: string) {
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
        },
        owners: {
          connect: [{ id: creatorId }]
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

  async delete(flatsIds: string[]) {
    await this.prisma.flat.deleteMany({
      where: {
        id: {
          in: flatsIds
        }
      }
    })

  }

  async updateRenters(flatId: string, renterIds: string[]) {
    return this.prisma.flat.update({
      where: { id: flatId },
      data: {
        renters: {
          set: renterIds.map(id => ({ id }))
        }
      },
      include: {
        renters: true
      }
    });
  }
}
