import { Module } from '@nestjs/common';
import { FlatService } from './flat.service';
import { FlatController } from './flat.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [UserModule],
  controllers: [FlatController],
  providers: [FlatService, PrismaService, RolesGuard],
  exports: [FlatService],
})
export class FlatModule {}
