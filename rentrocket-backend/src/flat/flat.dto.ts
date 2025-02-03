import { Status, Tag } from "@prisma/client"
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

    @IsEnum(Status)
    @IsOptional()
    status: Status

    @IsInt()
    @IsOptional()
    viewsCount: number

    @IsInt()
    @IsOptional()
    commentsCount: number

    @IsInt()
    @IsOptional()
    usersCount: number

    @IsBoolean()
    @IsOptional()
    recommended: boolean

    @IsNumber()
    @IsOptional()
    rating: number

    @IsString()
    @IsOptional()
    iconUrl: string

    @IsNumber()
    @IsOptional()
    order: number
}