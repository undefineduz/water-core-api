import { IsNumber } from "class-validator";

export class CreateCoordinationDto {
    @IsNumber()
    h: number;

    @IsNumber()
    q: number;
}
