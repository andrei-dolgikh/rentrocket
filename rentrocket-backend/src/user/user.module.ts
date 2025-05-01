import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { InvitationModule } from 'src/invitation/invitation.module';

@Module({
  imports: [forwardRef(() => InvitationModule)], //because of circular dependency
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule {}
