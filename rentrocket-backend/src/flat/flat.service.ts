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
        creator: true
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
        },
        owners: {
          connect: dto.owners?.map((user) => ({ id: user.id })),
        },
        renters: {
          connect: dto.renters?.map((user) => ({ id: user.id })),
        },
        managers: {
          connect: dto.managers?.map((user) => ({ id: user.id })),
        },
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
        owners: {
          connect: dto.owners?.map((user) => ({ id: user.id })),
        },
        renters: {
          connect: dto.renters?.map((user) => ({ id: user.id })),
        },
        managers: {
          connect: dto.managers?.map((user) => ({ id: user.id })),
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

  async addRenter(flatId: string, renterId: string) {
    return this.prisma.flat.update({
      where: { id: flatId },
      data: {
        renters: {
          connect: {
            id: renterId
          }
        }
      },
      include: {
        renters: true
      }
    });
  }

  async removeRenter(flatId: string, renterId: string) {
    return this.prisma.flat.update({
      where: { id: flatId },
      data: {
        renters: {
          disconnect: {
            id: renterId
          }
        }
      },
      include: {
        renters: true
      }
    });
  }

  async addManager(flatId: string, managerId: string) {
    return this.prisma.flat.update({
      where: { id: flatId },
      data: {
        managers: {
          connect: {
            id: managerId
          }
        }
      },
      include: {
        managers: true
      }
    });
  }

  async removeManager(flatId: string, managerId: string) {
    return this.prisma.flat.update({
      where: { id: flatId },
      data: {
        managers: {
          disconnect: {
            id: managerId
          }
        }
      },
      include: {
        managers: true
      }
    });
  }

  async addOwner(flatId: string, ownerId: string) {
    return this.prisma.flat.update({
      where: { id: flatId },
      data: {
        owners: {
          connect: {
            id: ownerId
          }
        }
      },
      include: {
        owners: true
      }
    });
  }

  async removeOwner(flatId: string, ownerId: string) {
    return this.prisma.flat.update({
      where: { id: flatId },
      data: {
        owners: {
          disconnect: {
            id: ownerId
          }
        }
      },
      include: {
        owners: true
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
