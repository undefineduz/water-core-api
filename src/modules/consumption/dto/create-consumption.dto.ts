import { IsBoolean, IsLatitude, IsLongitude, IsNumber } from "class-validator";

export class CreateConsumptionDto {
    @IsNumber()
    public h: number;

    @IsNumber()
    public q: number;

    @IsNumber()
    public velocity: number;

    @IsNumber()
    public temperature: number;

    @IsLatitude()
    public latitude: string;

    @IsLongitude()
    public longitude: string;

    @IsNumber()
    public v_bat: number;

    @IsBoolean()
    public charging: boolean;

    @IsNumber()
    public ime: number;
}
