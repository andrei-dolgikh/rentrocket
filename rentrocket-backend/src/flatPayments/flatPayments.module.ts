import { Module } from '@nestjs/common';
import { FlatPaymentsService } from './flatPayments.service';
import { FlatPaymentsController } from './flatPayments.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [UserModule],
  controllers: [FlatPaymentsController],
  providers: [FlatPaymentsService, PrismaService, RolesGuard],
  exports: [FlatPaymentsService]
})
export class FlatPaymentsModule {}
