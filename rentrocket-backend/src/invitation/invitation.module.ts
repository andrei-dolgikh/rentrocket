import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [UserModule],
  controllers: [InvitationController],
  providers: [InvitationService, PrismaService, RolesGuard],
  exports: [InvitationService],
})
export class InvitationModule {}
