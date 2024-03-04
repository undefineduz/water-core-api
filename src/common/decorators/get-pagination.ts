import { createParamDecorator, ExecutionContext, UnsupportedMediaTypeException } from "@nestjs/common";
import { IPagination } from "../interfaces";

export const GetPagination = createParamDecorator((data, ctx: ExecutionContext): IPagination => {
    const request = ctx.switchToHttp().getRequest();

    const paginationParams: IPagination = {
        skip: 0,
        limit: 10,
        sort: [],
        search: []
    };

    paginationParams.skip = request.query.skip ? parseInt(request.query.skip.toString()) : 0;
    paginationParams.limit = request.query.limit ? parseInt(request.query.limit.toString()) : 10;


    if (request.query.sort) {
        const sortFields = request.query.sort.toString().split(',');
        paginationParams.sort = sortFields?.map((sortField: string) => {
            const [field, by] = sortField.split(':');
            if (by !== 'DESC' && by !== 'ASC') {
                throw new UnsupportedMediaTypeException('Invalid sort by value');
            }
            return { field, by };
        });
    }

    if (request.query.search) {
        const searchFields = request.query.search.toString().split(',');
        paginationParams.search = searchFields.map((searchField: string) => {
            const [field, value] = searchField.split(':');
            return { field, value };
        });
    }

    return paginationParams;
});