import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    captcha: string
}


export class RegDto {
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    captcha: string

    @IsEmail()
    email: string

    @IsString()
    name: string
}