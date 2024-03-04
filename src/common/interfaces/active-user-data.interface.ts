import { Role } from "../enums";

/**
 * Represents the data of an active user.
 */
export interface ActiveUserData {
    /**
     * The "subject" of the token. The value of this property is the user ID
     * that granted this token.
     */
    sub: number;

    /**
     * The username of the active user.
     */
    username: string;

    /**
     * The role of the active user.
     */
    role: Role;
}