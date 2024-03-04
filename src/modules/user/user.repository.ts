import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    public async getByUsername(username: string): Promise<User> {
        return await this.createQueryBuilder('user')
            .select(['user.id', 'user.username', 'user.password'])
            .where('user.username = :username', { username })
            .getOne();
    }

    public async getById(id: number): Promise<User> {
        return await this.findOneByOrFail({ id });
    }

    public async getProfile(id: number): Promise<User> {
        return await this.findOneOrFail({
            select: [
                'id',
                'avatar',
                'username',
                'firstName',
                'lastName',
                'middleName',
                'passport',
                'phone',
                'latitude',
                'longitude',
            ],
            where: { id }
        });
    }
}