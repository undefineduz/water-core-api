import { IsNumber } from "class-validator";

export class SttachSensorToUserDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    sensorId: number;
}