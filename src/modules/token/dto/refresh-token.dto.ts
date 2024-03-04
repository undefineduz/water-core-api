import { IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for refreshing a token.
 */
export class RefreshTokenDto {
    /**
     * The refresh token.
     */
    @IsNotEmpty()
    public refreshToken: string;
}