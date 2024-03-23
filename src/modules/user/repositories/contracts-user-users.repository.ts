import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { baseUrl } from "src/common/helper";
import { IPagination } from "src/common/interfaces";
import { ContractsUserUsers } from "src/database/entities";
import { DataSource, EntityPropertyNotFoundError, QueryFailedError, Repository } from "typeorm";

@Injectable()
export class ContractUserUsersRepository extends Repository<ContractsUserUsers> {

    constructor(private dataSource: DataSource) {
        super(ContractsUserUsers, dataSource.createEntityManager());
    }

    public async getAllWithPaginationByUserId(userId: number, { limit, skip, sort, search }: IPagination) {
        try {
            const contractQb = this.createQueryBuilder('contractsUserUsers')
                .innerJoinAndSelect('contractsUserUsers.contract', 'contract')
                .innerJoinAndSelect('contract.file', 'file')
                .select("contract.id", "id")
                .addSelect("contract.title", "title")
                .addSelect("contract.fileId", "fileId")
                .addSelect(`CONCAT('${baseUrl}/', file.filename)`, "file")
                .addSelect("contractsUserUsers.status", "status")
                .addSelect("contractsUserUsers.report", "report")
                .addSelect("contract.createdAt", "createdAt")
                .where('contractsUserUsers.userId = :userId', { userId })


            if (search) {
                const where = search && Object.keys(search).map(key => `${key} LIKE '%${search[key]}%'`).join(' AND ');
                contractQb.andWhere(where);
            }

            if (sort) {
                contractQb.orderBy(sort)
            }
            contractQb
                .skip(skip)
                .take(limit);

            const data = await contractQb.getRawMany();
            const count = await contractQb.getCount();
            return { data, count };
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException(error.message);
            }
            console.error(error);
        }
    }

    public async getSensors(userId: number, { limit, skip, sort, search }: IPagination) {
        const contractQb = this.createQueryBuilder('contractsUserUsers')
    }

    public async getSensorsByUserId(userId: number, { limit, skip, sort, search }: IPagination) {
        try {
            const contractQb = this.createQueryBuilder('contractUser')
              .innerJoinAndSelect('contractUser.contract', 'contract')
              .where('contractUser.userId = :userId', { userId })

            if (search) {
                const where = search && Object.keys(search).map(key => `${key} LIKE '%${search[key]}%'`).join(' AND ');
                contractQb.andWhere(where);
            }

            if (sort) {
                contractQb.orderBy(sort)
            }
            contractQb
              .skip(skip)
              .take(limit);

            const data = await contractQb.getMany();
            const count = await contractQb.getCount();
            return { data, count };
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException(error.message);
            }
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }

}