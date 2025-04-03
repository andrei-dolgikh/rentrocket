import { Body, Controller, Req, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe, UseInterceptors } from "@nestjs/common";
import { FlatService } from "./flat.service";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentUser } from "src/decorators/user.decorator";
import { FlatDto } from "./flat.dto";
import { RoleUser } from "src/decorators/roles.decorator";
import { RolesGuard } from 'src/guards/roles.guard';
import { UseGuards } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { JwtGuard } from "src/guards/jwt.guard";
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('flats')
export class FlatController {
  constructor(private readonly flatService: FlatService) { }

  @Get("catalog")
  @HttpCode(200)
  async getCatalog() {
    return this.flatService.getCatalog()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":flatId")
  async getById(
    @Param('flatId') flatId: string
  ) {
    return this.flatService.getById(flatId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("create")
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async create(
    @Body() dto: FlatDto,
    @CurrentUser('id') userId: string
  ) {
    return this.flatService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update/:flatId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async update(
    @Body() dto: FlatDto,
    @CurrentUser('id') userId: string,
    @Param('flatId') flatId: string
  ) {
    return this.flatService.update(dto, flatId, userId)
  }


  @HttpCode(200)
  @Post('delete')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async delete(@Body() flatIds: string[]) {
    return this.flatService.delete(flatIds)
  }

  @Post('images')
  @UseGuards(JwtGuard, RolesGuard)
  @Auth()
  @RoleUser()
  @UseInterceptors(FileInterceptor('image', {
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
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new HttpException('Убедитесь, что вы загружаете изображение не более 5Мб в формате jpg / jpeg / png.', HttpStatus.INTERNAL_SERVER_ERROR), false);
      }
      cb(null, true);
    },
  }))
  async uploadFlatImage(
    @Req() req: any,
    @CurrentUser('id') userId: string
  ) {
    try {
      if (req.file) {
        console.log('Req:', req.file);
        const url = `uploads/${req.file.filename}`;
        return { url };
      }
    }
    catch (e) {
      throw new HttpException('Убедитесь, что вы загружаете изображение не более 5Мб в формате jpg / jpeg / png.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    throw new HttpException('Файл не был загружен', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  
  @Post('add-images/:flatId')
  @UseGuards(JwtGuard, RolesGuard)
  @Auth()
  @RoleUser()
  async addImagesToFlat(
    @Param('flatId') flatId: string,
    @Body() imageUrls: string[]
  ) {
    return this.flatService.addImagesToFlat(flatId, imageUrls);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('renters/:flatId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async updateRenters(
    @Param('flatId') flatId: string,
    @Body() renterIds: string[]
  ) {
    return this.flatService.updateRenters(flatId, renterIds);
  }
}


