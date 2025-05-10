import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatMessageDto } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getMessages(flatId: string, userId: string) {
    // Verify user has access to this flat
    const hasAccess = await this.checkUserFlatAccess(flatId, userId);
    if (!hasAccess) {
      throw new NotFoundException('Flat not found or access denied');
    }

    return this.prisma.chatMessage.findMany({
      where: { flatId },
      include: {
        user: {
          select: {
            id: true,
            name: true,          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createMessage(dto: ChatMessageDto, userId: string) {
    // Verify user has access to this flat
    const hasAccess = await this.checkUserFlatAccess(dto.flatId, userId);
    if (!hasAccess) {
      throw new NotFoundException('Flat not found or access denied');
    }

    return this.prisma.chatMessage.create({
      data: {
        message: dto.message,
        files: dto.files || [],
        flat: { connect: { id: dto.flatId } },
        user: { connect: { id: userId } },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  private async checkUserFlatAccess(flatId: string, userId: string): Promise<boolean> {
    const flat = await this.prisma.flat.findFirst({
      where: {
        id: flatId,
        OR: [
          { creatorId: userId },
          { owners: { some: { id: userId } } },
          { managers: { some: { id: userId } } },
          { renters: { some: { id: userId } } },
        ],
      },
    });
    return !!flat;
  }
}