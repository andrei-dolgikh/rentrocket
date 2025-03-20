import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getById(tagId: string) {
    return this.prisma.tag.findUnique({
      where: {
        id: tagId
      }
    })
  }

  async getAll() {
    return this.prisma.tag.findMany()
  }

  async create(dto: TagDto, userId: string) {
    return this.prisma.tag.create({
      data: {
        creatorId: userId,
        ...dto
      }
    })
  }

  async update(dto: Partial<TagDto>, tagId: string) {
    return this.prisma.tag.update({
      where: {
        id: tagId
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }

  async delete(tagId : string) {
    return this.prisma.tag.delete({
      where: {
        id: tagId
      }
    })
  }
}
