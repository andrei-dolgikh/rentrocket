import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CounterService } from "./counter.service";
import { Auth } from "src/decorators/auth.decorator";
import { CounterDto, CounterReadingDto } from "./counter.dto";
import { CurrentUser } from 'src/decorators/user.decorator';
import { RoleUser } from "src/decorators/roles.decorator";
import { RolesGuard } from 'src/guards/roles.guard';
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller('counters')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get("list/:flatId")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async getAll(@Param('flatId') flatId: string) {
    return this.counterService.getAll(flatId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":counterId")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async getById(
    @Param('counterId') counterId: string
  ) {
    return this.counterService.getById(counterId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("create/:flatId")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async create(@Body() dto: CounterDto, @CurrentUser('id') userId: string, @Param('flatId') flatId: string) {
    return this.counterService.create(dto, flatId, userId)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("readings/:counterId")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async addReading(@Body() dto: CounterReadingDto, @CurrentUser('id') userId: string, @Param('counterId') counterId: string) {
    return this.counterService.addReading(dto, userId, counterId)
  }

  @HttpCode(200)
  @Delete("readings/:readingId")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async removeReading(@Param('readingId') readingId: string, @CurrentUser('id') userId: string) {
    return this.counterService.removeReading(readingId, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update/:counterId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async update(
    @Body() dto: CounterDto,
    @Param('counterId') counterId: string, 
    @CurrentUser('id') userId: string
  ) {
    return this.counterService.update(dto, counterId, userId)
  }

  @HttpCode(200)
  @Delete('delete/:counterId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async delete(@Param('counterId') counterId: string, @CurrentUser('id') userId: string) {
    return this.counterService.delete(counterId, userId)
  }
}
