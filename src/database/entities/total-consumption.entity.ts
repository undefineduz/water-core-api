import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TotalConsumption {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public sensorId: number;

    @Column()
    public userId: number;

    @Column()
    public time: string;

    @Column()
    public q: string;

    @Column()
    public v: string;

    @Column()
    public price: string;

    @CreateDateColumn()
    public createdAt: Date;
}