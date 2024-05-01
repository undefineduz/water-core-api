import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm';
import { TotalConsumption } from 'src/database/entities';

@Injectable()
export class TotalConsumptionRepository extends Repository<TotalConsumption> {

  constructor(
    private dataSource: DataSource) {
    super(TotalConsumption, dataSource.createEntityManager());
  }

}
