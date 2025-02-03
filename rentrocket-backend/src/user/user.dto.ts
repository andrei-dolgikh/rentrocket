import { Roles } from "@prisma/client";
import { IsArray, IsEmail, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class UserDto {
    @IsOptional()
    login?: string;

    @IsString()
    @MinLength(6, {
        message: 'Пароль должен быть не менее 6 символов длиной.'
    })
    @IsOptional()
    password?: string;

    @IsOptional()
    name?: string;

    @IsArray()
    @IsOptional()
    roles?: Roles[]
}