import { IsEnum, IsNumber } from "class-validator";
import { Exists } from "src/common/decorators/validator";
import { ContractStatus } from "src/common/enums";
import { Contract } from "src/database/entities";

export class ContractStatusDto {
    @IsNumber()
    // @Exists(Contract, 'id')
    public id: number;

    @IsEnum(ContractStatus)
    public status: ContractStatus;
} 