import { IsDate, IsDateString } from "class-validator";

export class DateIntervalDto {
    @IsDateString()
    public readonly from: string;

    @IsDateString()
    public readonly to: string;
}