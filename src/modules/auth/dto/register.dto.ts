import { Transform } from 'class-transformer';
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    userName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    // @Matches()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @Transform(({ value }) => {
        return new Date(value);
    })
    @IsDate()
    dob: Date;
}
