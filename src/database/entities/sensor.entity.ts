import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('sensors')
export class Sensor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, type: 'varchar', length: 16 })
    imei: string;

    @ManyToOne(
        () => User,
        {
            nullable: true
        }
    )
    public user?: User;

    @Column({ nullable: true })
    public userId?: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;
}
