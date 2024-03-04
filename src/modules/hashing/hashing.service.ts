import { Injectable } from '@nestjs/common';

/**
 * Abstract class representing a hashing service.
 */
@Injectable()
export abstract class HashingService {
    /**
     * Hashes the given plain text.
     * @param plainText - The plain text to be hashed.
     * @returns A promise that resolves to the hashed value.
     */
    abstract hash(plainText: string | Buffer): Promise<string>;

    /**
     * Compares the given plain text with the encrypted value.
     * @param plainText - The plain text to be compared.
     * @param encrypted - The encrypted value to be compared against.
     * @returns A promise that resolves to a boolean indicating whether the comparison is successful.
     */
    abstract compare(
        plainText: string | Buffer,
        encrypted: string,
    ): Promise<boolean>;
}