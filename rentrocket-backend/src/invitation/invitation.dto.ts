import { IsString } from "class-validator"

export class AddUserDto {
    @IsString()
    email: string

    @IsString()
    role: string
}

export class RemoveUserDto {
    @IsString()
    userId: string

    @IsString()
    role: string
}