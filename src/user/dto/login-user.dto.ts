import { IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty({ message: 'Account name is required' })
    accountname: string;
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;
}