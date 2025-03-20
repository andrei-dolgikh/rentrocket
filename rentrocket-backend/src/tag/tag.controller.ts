import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { TagService } from "./tag.service";
import { Auth } from "src/decorators/auth.decorator";
import { TagDto } from "./tag.dto";
import { CurrentUser } from 'src/decorators/user.decorator';
import { RoleUser } from "src/decorators/roles.decorator";
import { RolesGuard } from 'src/guards/roles.guard';
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get("list")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async getAll() {
    return this.tagService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":tagId")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async getById(
    @Param('tagId') tagId: string
  ) {
    return this.tagService.getById(tagId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("create")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async create(@Body() dto: TagDto, @CurrentUser('id') userId: string) {
    return this.tagService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update/:tagId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async update(
    @Body() dto: TagDto,
    @Param('tagId') tagId: string
  ) {
    return this.tagService.update(dto, tagId)
  }

  @HttpCode(200)
  @Delete('delete/:tagId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async delete(@Param('tagId') tagId: string) {
    return this.tagService.delete(tagId)
  }
}
