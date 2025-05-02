import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [UserModule],
  controllers: [CounterController],
  providers: [CounterService, PrismaService, RolesGuard],
  exports: [CounterService]
})
export class CounterModule {}
