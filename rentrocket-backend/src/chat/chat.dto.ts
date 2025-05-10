import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class ChatMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsArray()
  files?: string[];

  @IsNotEmpty()
  @IsString()
  flatId: string;
}