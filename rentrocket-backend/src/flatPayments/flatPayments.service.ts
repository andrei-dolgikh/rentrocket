import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FlatPaymentsDto } from './flatPayments.dto';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class FlatPaymentsService {
  constructor(private prisma: PrismaService) { }

  async getById(flatPaymentsId: string) {
    return this.prisma.flatPayments.findUnique({
      where: {
        id: flatPaymentsId
      }
    })
  }

  async getAll() {
    return this.prisma.flatPayments.findMany()
  }

async create(dto: FlatPaymentsDto, userId: string) {
  const { flatId, ...restDto } = dto;

  return this.prisma.flatPayments.create({
    data: {
      ...restDto,
      user: {
        connect: {
          id: userId
        }
      },
      flat: {
        connect: {
          id: dto.flatId
        }
      }
    }
  })
}

  async update(dto: Partial<FlatPaymentsDto>, flatPaymentsId: string) {
    return this.prisma.flatPayments.update({
      where: {
        id: flatPaymentsId
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }

  async delete(flatPaymentsId: string) {
    return this.prisma.flatPayments.delete({
      where: {
        id: flatPaymentsId
      }
    })
  }
}
