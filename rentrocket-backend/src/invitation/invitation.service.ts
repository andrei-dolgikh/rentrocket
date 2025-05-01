import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FlatInvitationRole, FlatInvitationStatus } from '@prisma/client';
import { AddUserDto, RemoveUserDto} from './invitation.dto';

export interface DashboardLinksStatsInterface {
  id: string;
  timestamp: Date;
  flatId: string;
  available: boolean;
}

@Injectable()
export class InvitationService {
  constructor(private prisma: PrismaService) {}

  async addUserByEmail(flatId: string, dto : AddUserDto, currentUserId : string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email 
      }
    });

    const invitationData = {
      email: dto.email,
      role: dto.role as FlatInvitationRole,
      invitedBy: {
        connect: {
          id: currentUserId
        }
      },
      flat: {
        connect: {
          id: flatId
        }
      }
    };

    if (existingUser) {
      invitationData['user'] = {
        connect: {
          id: existingUser.id
        }
      };
    }

    return this.prisma.flatInvitation.create({
      data: invitationData
    });

  }

  async removeUser(flatId: string, dto : RemoveUserDto) {
    switch (dto.role) {
      case FlatInvitationRole.OWNER:
        return this.prisma.flat.update({
          where: { id: flatId },
          data: {
            owners: {
              disconnect: {
                id: dto.userId
              }
            }
          },
          include: {
            owners: true
          }
        });

      case FlatInvitationRole.RENTER:
        return this.prisma.flat.update({
          where: { id: flatId },
          data: {
            renters: {
              disconnect: {
                id: dto.userId
              }
            }
          },
          include: {
            renters: true
          }
        });

      case FlatInvitationRole.MANAGER:
        return this.prisma.flat.update({
          where: { id: flatId },
          data: {
            managers: {
              disconnect: {
                id: dto.userId
              }
            }
          },
          include: {
            managers: true
          }
        });
    }
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

  async acceptInvitation(invitationId: string, userId: string) {
    const invitation = await this.prisma.flatInvitation.findUnique({
      where: { id: invitationId, userId: userId }
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    switch (invitation.role) {
      case FlatInvitationRole.OWNER:
        return this.prisma.flat.update({
          where: { id: invitation.flatId },
          data: {
            owners: {
              connect: {
                id: userId
              }
            }
          },
          include: {
            owners: true
          }
        });

      case FlatInvitationRole.RENTER:
        return this.prisma.flat.update({
          where: { id: invitation.flatId },
          data: {
            renters: {
              connect: {
                id: userId
              }
            }
          },
          include: {
            renters: true
          }
        });

      case FlatInvitationRole.MANAGER:
        return this.prisma.flat.update({
          where: { id: invitation.flatId },
          data: {
            managers: {
              connect: {
                id: userId
              }
            }
          },
          include: {
            managers: true
          }
        });
    }


    return this.prisma.flatInvitation.update({
      where: { id: invitationId },
      data: {
        status: FlatInvitationStatus.ACCEPTED
      }
    });
  }

  async rejectInvitation(invitationId: string, userId: string) {
    return this.prisma.flatInvitation.update({
      where: { id: invitationId, userId: userId },
      data: {
        status: FlatInvitationStatus.REJECTED
      }
    })
  }
}
