import { IsNumber } from "class-validator";

export class InsertPriceDto {
    @IsNumber()
    public price: number;
}