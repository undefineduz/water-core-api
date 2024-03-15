import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateContractDto {

    @IsString()
    public title: string;

    @IsNumber()
    public fileId: number;

    @Type(() => Number)
    @IsNumber({}, { each: true })
    public userIds: number[];
}
