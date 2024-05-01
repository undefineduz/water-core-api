import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sensor } from "./sensor.entity";

@Entity('consumptions')
export class Consumption {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'float',
    })
    public measured_distance: number;

    @Column()
    public q_cordinate_table: number;

    @Column()
    public q: number;

    @Column({
        nullable: true
    })
    public S: number;

    @Column({
        type: 'float',
        nullable: true
    })
    public velocity?: number;

    @Column({
        type: 'float',
        nullable: true
    })
    public velocityAverage?: number;

    @Column({
        type: 'float',
        nullable: true
    })
    public timeDifference?: number;

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

    @Column({
        type: 'float',
        nullable: true,
    })
    public width?: number;

    @ManyToOne(() => Sensor, (sensor) => sensor.imei, { nullable: false })
    @JoinColumn({ name: 'imei', referencedColumnName: 'imei', foreignKeyConstraintName: 'imei' })
    public sensor: Sensor;

    @Column({ nullable: false, type: 'string' })
    public imei: string;

    @Column()
    public userId: number;

    @CreateDateColumn()
    public createdAt: Date;
}