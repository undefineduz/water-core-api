import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

/**
 * Service for hashing and comparing values using bcrypt.
 */
@Injectable()
export class BcyptService implements HashingService {
    /**
     * Hashes the given plain text using bcrypt.
     * @param plainText - The plain text to be hashed.
     * @returns A promise that resolves to the hashed value.
     */
    public async hash(plainText: string | Buffer): Promise<string> {
        const saltRounds = await genSalt();
        return hash(plainText, saltRounds);
    }

    /**
     * Compares the given plain text with the encrypted value using bcrypt.
     * @param plainText - The plain text to be compared.
     * @param encrypted - The encrypted value to be compared against.
     * @returns A promise that resolves to a boolean indicating whether the values match.
     */
    public compare(plainText: string | Buffer, encrypted: string): Promise<boolean> {
        return compare(plainText, encrypted);
    }
}