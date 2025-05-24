import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"

export class FlatPaymentsDto {

    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsArray()
    @IsOptional()
    files: string[]

    @IsNumber()
    @IsOptional()
    amount: number

    @IsString()
    flatId: string

    @IsDate()
    @IsOptional()
    period: Date
}