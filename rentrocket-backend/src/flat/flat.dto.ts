import { Tag, User } from "@prisma/client"
import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator"

export class FlatDto {

    @IsString()
    @IsOptional()
    name: string

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

    @IsArray()
    @IsOptional()
    images: string[]

    @IsNumber()
    @IsOptional()
    order: number

    @IsString()
    @IsOptional()
    address: string

    @IsString()
    @IsOptional()
    entergroup: string

    @IsNumber()
    @IsOptional()
    chambres: number

    @IsNumber()
    @IsOptional()
    size: number

    @IsArray()
    @IsOptional()
    renters: User[]

    @IsArray()
    @IsOptional()
    managers: User[]

    @IsArray()
    @IsOptional()
    owners: User[]

    
}