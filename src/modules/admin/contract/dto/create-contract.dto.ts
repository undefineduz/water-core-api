import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateContractDto {

    @IsString()
    public title: string;

    @IsNumber()
    public fileId: number;

    @IsArray()
    @IsNumber({}, { each: true })
    public userId: number[];
}
