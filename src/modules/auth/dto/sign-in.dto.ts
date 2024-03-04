import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Represents the data transfer object for signing in.
 */
export class SignInDto {
    /**
     * The username for signing in.
     */
    @IsString()
    @IsNotEmpty()
    username: string;

    /**
     * The password for signing in.
     * Must be at least 10 characters long.
     */
    @MinLength(10)
    @IsNotEmpty()
    password: string;
}