import { IsNumber, IsString } from "class-validator";

export class CreateRegionDto {
    @IsString()
    name: string;

    @IsNumber()
    stateId: number;
}
