import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"

export class TagDto {

    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    order: number
}