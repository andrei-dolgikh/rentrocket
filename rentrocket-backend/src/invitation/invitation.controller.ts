import { Body, Controller, Param, Post, Get } from "@nestjs/common";
import { InvitationService } from "./invitation.service";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentUser } from "src/decorators/user.decorator";
import { AddUserDto, RemoveUserDto } from "./invitation.dto";
import { RoleUser } from "src/decorators/roles.decorator";
import { RolesGuard } from 'src/guards/roles.guard';
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) { }

  @Post('add-user/:flatId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async addUser(
    @CurrentUser('id') userId: string,
    @Param('flatId') flatId: string,
    @Body() dto: AddUserDto
  ) {
    return this.invitationService.addUserByEmail(flatId, dto, userId);
  }

  @Post('remove-user/:flatId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async removeUser(
    @Param('flatId') flatId: string,
    @Body() dto: RemoveUserDto
  ) {
    return this.invitationService.removeUser(flatId, dto);
  }

  @Get('accept/:invitationId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async acceptInvitation(
    @CurrentUser('id') userId: string, @Param('invitationId') invitationId: string) {
    return this.invitationService.acceptInvitation(invitationId, userId);
  }

  @Get('reject/:invitationId')
  @Auth()
  @UseGuards(JwtGuard, RolesGuard)
  @RoleUser()
  async rejectInvitation(
    @CurrentUser('id') userId: string, @Param('invitationId') invitationId: string) {
    return this.invitationService.rejectInvitation(invitationId, userId);
  }
}


