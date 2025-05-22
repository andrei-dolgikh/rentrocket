import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"

export class CounterDto {

    @IsString()
    @IsOptional()
    name: string
}

export class CounterReadingDto {

    @IsString()
    @IsOptional()
    counterId: string

    @IsNumber()
    @IsOptional()
    value: number

    @IsString()
    @IsOptional()
    period: string
}