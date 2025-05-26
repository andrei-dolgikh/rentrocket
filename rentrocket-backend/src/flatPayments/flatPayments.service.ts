import { Injectable, NotFoundException } from '@nestjs/common';
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
  const flat = await this.prisma.flat.findUnique({
    where: {
      id: flatId
    },
    select: {
      id: true,
      renters: true,
      managers: true,
      owners: true
    }
  });

  if (!flat) {
    throw new NotFoundException('Flat not found');
  }
  if (!flat.renters.some((renter) => renter.id === userId) && !flat.owners.some((owner) => owner.id === userId) && !flat.managers.some((manager) => manager.id === userId)) {
    throw new NotFoundException('You are not allowed to create a payment for this flat');
  }

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
