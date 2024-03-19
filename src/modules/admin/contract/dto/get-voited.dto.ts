import { IsEnum, IsOptional } from "class-validator";
import { ContractStatus } from "src/common/enums";

export class GetVoitedDto {

    @IsOptional()
    @IsEnum(ContractStatus)
    public status: ContractStatus;

}