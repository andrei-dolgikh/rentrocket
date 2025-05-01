import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FlatInvitationRole } from '@prisma/client';
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
        images: true,
        createdAt: true,
        updatedAt: true,
        address: true,
        entergroup: true,
        chambres: true,
        size: true,
        renters: true,
        managers: true,
        owners: true,
        creator: true,
        invitations: {
          include: {
            invitedBy: true,
            user: true
          }
        }
      },
      where: {
        id
      }
    })
  }

  async getCatalog(userId: string) {
    return this.prisma.flat.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        iconUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        OR: [
          { managers: { some: { id: userId } } },
          { renters: { some: { id: userId } } },
          { owners: { some: { id: userId } } }
        ]
      }
    })
  }

  async create(dto: FlatDto, creatorId: string) {
    dto.order = 0

    return this.prisma.flat.create({
      data: {
        ...dto,
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
        updatedAt: new Date()
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

  async addImagesToFlat(flatId: string, imageUrls: string[]) {
    const flat = await this.prisma.flat.findUnique({
      where: { id: flatId }
    });
  
    if (!flat) {
      throw new NotFoundException('Flat not found');
    }
  
    return this.prisma.flat.update({
      where: { id: flatId },
      data: {
        images: {
          push: imageUrls
        }
      }
    });
  }
}
