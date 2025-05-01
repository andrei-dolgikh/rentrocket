import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';
import { UserDto } from './user.dto';
import { Roles } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        sentInvitations: true,
        receivedInvitations: {
          include : {
            invitedBy: true
          }
        },
        FlatsInManagement: true,
        FlatsInOwnership: true,
        FlatsInRent: true
      }
    })
  }

  getByLogin(login: string) {
    const user = this.prisma.user.findUnique({
      where: {
        login
      }
    })
    return user
  }

  getAll() {
    return this.prisma.user.findMany()
  }

  getAllByFlatId(id: string) {
    const renters = this.prisma.flat.findUnique({
      where: { id: id },
      select: {
        renters: true,
        managers: true,
        creator: true,
        owners: true
      }
    });

    return renters;
  }

  async getProfile(id: string) {
    const profile = await this.getById(id)
    const roles = profile.roles

    const { password, ...rest } = profile

    return {
      user : rest,
      statistics: [
        { label : 'Роли: ', value: roles },
      ]
    }
  }
  
  async create(dto: UserDto) {
    const user = {
      login: dto.login,
      name: dto.name,
      roles: [Roles.user],
      password: await hash(dto.password),
    }

    return this.prisma.user.create({
      data: user
    })
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }

  async update(id: string, dto: UserDto) {
    let data = dto

    if (dto.password) {
      data = {
        ...dto,
        password: await hash(dto.password)
      }
    }
    
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        login: true,
        name: true,
        roles: true
      }
    })
  }
}
