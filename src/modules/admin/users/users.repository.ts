import { ConflictException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { User } from 'src/database/entities';
import { DataSource, EntityPropertyNotFoundError, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    public async createUser(data: Partial<User>): Promise<User> {
        try {
            return await this.save(data);
        } catch (error) {
            if (error instanceof EntityPropertyNotFoundError) {
                throw new UnprocessableEntityException(error.message);
            };

            if (error.code == 'ER_DUP_ENTRY') {
                throw new ConflictException(error.sqlMessage);
            }
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    public async getById(id: number): Promise<User> {
        return await this.findOneByOrFail({ id });
    }

    public async getAll({ limit, search, skip, sort }: IPagination) {
        try {
            const where = search.map((searchField) => {
                return { [searchField.field]: searchField.value };
            });

            const [data, count] = await this.createQueryBuilder('user')
                .where(where)
                .limit(limit)
                .skip(skip)
                .getManyAndCount();
            return { data, count };
        } catch (error) {
            if (error instanceof EntityPropertyNotFoundError) {
                throw new UnprocessableEntityException(error.message);
            };

            throw new InternalServerErrorException();
        }
    }

    public async updateUser(id: number, data: Partial<User>) {
        try {
            console.log(data);
            return await this.update(id, data);
        } catch (error) {
            if (error instanceof EntityPropertyNotFoundError) {
                throw new UnprocessableEntityException(error.message);
            };

            if (error.code == 'ER_DUP_ENTRY') {
                throw new ConflictException(error.sqlMessage);
            }
            console.error(error);
            throw new InternalServerErrorException();
        }
    }
} 