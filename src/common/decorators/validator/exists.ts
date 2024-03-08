// dependencies
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';

// validator constraint
@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class ExistsValidator implements ValidatorConstraintInterface {
    constructor(
        @Inject('DbConnectionToken') private readonly connection: Connection,
    ) { }

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const [entity, field,] = args.constraints;

        // Ensure correct TypeORM import
        const repository = getRepository(entity);

        // Correct method name to find a single entry
        const find = await repository.findOne({ [field]: value });
        return !!find; // change to return a boolean value
    }

    defaultMessage(args: ValidationArguments): string {
        return `'${args.property}' ${args.value} doesn't exist`;
    }
}

// decorator function
export function Exists(entity: Function, field: string, validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'Exists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, field],
            validator: ExistsValidator,
        });
    };
}
