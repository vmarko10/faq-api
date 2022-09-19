import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class authDto {

    @IsNotEmpty()
    @MaxLength(30)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(30)
    email: string;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    password: string;
}