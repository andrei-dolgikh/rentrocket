import { Tag } from "@prisma/client"
import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator"

export class FlatDto {

    @IsString()
    @IsOptional()
    name: string

    @IsArray()
    @IsOptional()
    tags: Tag[]

    @IsInt()
    @IsOptional()
    price: number

    @IsString()
    @IsOptional()
    description: string

    @IsBoolean()
    @IsOptional()
    isAvailable: boolean

    @IsString()
    @IsOptional()
    iconUrl: string

    @IsNumber()
    @IsOptional()
    order: number
}