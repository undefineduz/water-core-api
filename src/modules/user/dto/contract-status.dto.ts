import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { ContractStatus } from "src/common/enums";

export class ContractStatusDto {
    @IsNumber()
    public id: number;

    @IsEnum(ContractStatus)
    public status: ContractStatus;

    @ValidateIf(o => o.status === ContractStatus.REJECTED)
    @IsNotEmpty()
    @IsString()
    public report: string;
} 