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
      }
    })
  }

  getByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: {
        login
      }
    })
  }

  getAll() {
    return this.prisma.user.findMany()
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
