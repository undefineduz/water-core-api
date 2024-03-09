import { IsEnum, IsLatitude, IsLongitude, IsNumber, IsNumberString, IsPassportNumber, IsPhoneNumber, IsString, Matches } from "class-validator";
import { GenderType, PassportSeries } from "src/common/enums";

export class CreateUserDto {

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public middleName: string;

    @IsPhoneNumber('UZ')
    public phone: string;

    @IsString()
    public password: string;

    @IsString()
    public username: string;

    @IsLatitude()
    public latitude: string;

    @IsLongitude()
    public longitude: string;

    @Matches(/(KA)|(AD\d+)/, { message: 'passport series is invalid' })
    public passport: string;

    @IsEnum(GenderType)
    public gender: GenderType;

    @IsNumber()
    public regionId: number;

}
