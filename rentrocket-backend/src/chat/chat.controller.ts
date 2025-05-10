import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './chat.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Auth()
  @Get('flat/:flatId')
  async getMessages(
    @Param('flatId') flatId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.chatService.getMessages(flatId, userId);
  }

  @Auth()
  @Post('message')
  async createMessage(
    @Body() dto: ChatMessageDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.chatService.createMessage(dto, userId);
  }
}