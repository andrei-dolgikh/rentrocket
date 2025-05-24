import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { FlatPaymentsService } from "./flatPayments.service";
import { Auth } from "src/decorators/auth.decorator";
import { FlatPaymentsDto } from "./flatPayments.dto";
import { CurrentUser } from 'src/decorators/user.decorator';
import { RoleUser } from "src/decorators/roles.decorator";
import { RolesGuard } from 'src/guards/roles.guard';
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller('flatPayments')
export class FlatPaymentsController {
  constructor(private readonly flatPaymentsService: FlatPaymentsService) {}

  @Get("list")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async getAll() {
    return this.flatPaymentsService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":flatPaymentsId")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async getById(
    @Param('flatPaymentsId') flatPaymentsId: string
  ) {
    return this.flatPaymentsService.getById(flatPaymentsId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("create")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async create(@Body() dto: FlatPaymentsDto, @CurrentUser('id') userId: string) {
    return this.flatPaymentsService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update/:flatPaymentsId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async update(
    @Body() dto: FlatPaymentsDto,
    @Param('flatPaymentsId') flatPaymentsId: string
  ) {
    return this.flatPaymentsService.update(dto, flatPaymentsId)
  }

  @HttpCode(200)
  @Delete('delete/:flatPaymentsId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async delete(@Param('flatPaymentsId') flatPaymentsId: string) {
    return this.flatPaymentsService.delete(flatPaymentsId)
  }
}
