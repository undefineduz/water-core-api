import { Injectable } from '@nestjs/common';
import { LocalFile } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LocalFilesRepository extends Repository<LocalFile> {
    constructor(private dataSource: DataSource) {
        super(LocalFile, dataSource.createEntityManager());
    }

    public async getById(id: number): Promise<LocalFile> {
        return await this.findOneBy({ id });
    }

}
