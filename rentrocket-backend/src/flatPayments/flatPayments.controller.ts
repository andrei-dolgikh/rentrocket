import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe, UseInterceptors, Req } from "@nestjs/common";
import { FlatPaymentsService } from "./flatPayments.service";
import { Auth } from "src/decorators/auth.decorator";
import { FlatPaymentsDto } from "./flatPayments.dto";
import { CurrentUser } from 'src/decorators/user.decorator';
import { RoleUser } from "src/decorators/roles.decorator";
import { RolesGuard } from 'src/guards/roles.guard';
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guards/jwt.guard";
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('flatPayments')
export class FlatPaymentsController {
  constructor(private readonly flatPaymentsService: FlatPaymentsService) { }

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

  @Post('files')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.random().toString(36).charAt(2))).join('');
        file.filename = `${randomName}${extname(file.originalname)}`;
        return cb(null, file.filename);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
        return cb(new HttpException('Убедитесь, что вы загружаете изображение или PDF не более 5Мб в формате jpg / jpeg / png / pdf.', HttpStatus.INTERNAL_SERVER_ERROR), false);
      }
      cb(null, true);
    },
  }))
  async uploadFiles(
    @Req() req: any,
    @CurrentUser('id') userId: string
  ) {
    try {
      if (req.files && req.files.length > 0) {
        console.log('Req:', req.files);
        const files = req.files.map(file => {
          const url = `uploads/${file.filename}`;
          const fileType = file.originalname.match(/\.pdf$/) ? 'pdf' : 'image';
          return { url, type: fileType };
        });
        return { files };
      }
    }
    catch (e) {
      throw new HttpException('Убедитесь, что вы загружаете файлы не более 5Мб в формате jpg / jpeg / png / pdf.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    throw new HttpException('Файлы не были загружены', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
