import { Controller, Get,Post, Body,UsePipes, HttpCode, Put, ValidationPipe, UseGuards, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserDto } from './user.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleUser } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @Auth()
  // @UseGuards(JwtGuard, RolesGuard)
  // @RoleUser()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("create")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async create(
    @Body() dto: UserDto, 
  ) {
    return this.userService.create(dto)
  }


  @Get('detail/:id')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async getUser(@Param('id') id: string) {
    return this.userService.getProfile(id)
  }

  @Get('list')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async getAll() {
    return this.userService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('my-update')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update/:id')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('delete/:id')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id)
  }

}
