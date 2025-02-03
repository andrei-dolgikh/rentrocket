import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [UserModule],
  controllers: [TagController],
  providers: [TagService, PrismaService, RolesGuard],
  exports: [TagService]
})
export class TagModule {}
