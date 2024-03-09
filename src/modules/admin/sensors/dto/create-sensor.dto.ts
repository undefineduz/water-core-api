import { IsNumberString, IsString, Length, MinLength} from "class-validator";

export class CreateSensorDto {
    @IsString()
    name: string;

    @IsNumberString()
    @Length(15, 15, { message: 'IMEI must be 15 characters' })
    imei: string;
}
