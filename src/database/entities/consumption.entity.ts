import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sensor } from "./sensor.entity";

@Entity('consumptions')
export class Consumption {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'float',
    })
    public h: number;

    @Column()
    public q: number;

    @Column({
        type: 'float',
    })
    public velocity: number;

    @Column({
        type: 'float',
    })
    public temperature: number;

    @Column()
    public latitude: string;

    @Column()
    public longitude: string;

    @Column({
        type: 'float',
    })
    public v_bat: number

    @Column({
        type: 'boolean'
    })
    public charging: boolean;

    @ManyToOne(() => Sensor, (sensor) => sensor.imei, { nullable: false })
    public imei: string;

    @CreateDateColumn()
    public createdAt: Date;
}