import { IsNumber } from "class-validator";

export class CalcParamsDto {
    @IsNumber()
    public bottom_length: number;
    
    @IsNumber()
    public height: number;

    @IsNumber()
    public alpha: number;

    @IsNumber()
    public beta: number;
}