import { IsBoolean, IsLatitude, IsLongitude, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class CreateConsumptionDto {
    @IsNumber()
    public measured_distance: number;

    @IsOptional()
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

    @IsNumberString()
    public imei: string;
}
