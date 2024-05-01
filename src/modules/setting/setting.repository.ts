import { Injectable } from '@nestjs/common';
import { Settings } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SettingRepository extends Repository<Settings> {
    constructor(private dataSource: DataSource) {
        super(Settings, dataSource.createEntityManager());
    }
}
