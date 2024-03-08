import { createParamDecorator, ExecutionContext, UnprocessableEntityException } from "@nestjs/common";
import { IPagination } from "../interfaces";
import { isObject } from "class-validator";

export const GetPagination = createParamDecorator((data, ctx: ExecutionContext): IPagination => {
    const request = ctx.switchToHttp().getRequest();

    // Destructuring with default values
    const { skip = '0', limit = '10', sort, search } = request.query;

    // Parse skip and limit to integers
    const parsedSkip = parseInt(skip, 10);
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedSkip) || parsedSkip < 0 || isNaN(parsedLimit) || parsedLimit <= 0 || (sort && !isObject(sort)) || (search && !isObject(search))) {
        throw new UnprocessableEntityException('Invalid query');
    }

    return { skip: parsedSkip, limit: parsedLimit, sort, search };
});

