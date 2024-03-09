import { Exclude } from "class-transformer";
import { GenderType, Role } from "src/common/enums";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from "./contracts.entity";
import { ContractsUserUsers } from "./contracts-user-users.entity";
import { Sensor } from "./sensor.entity";
import { Regions } from "./region.entity";

@Entity('users')
@Index(["firstName", "lastName"])
@Index(["firstName", "middleName", "lastName"], { unique: true })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column({ nullable: true })
    public middleName: string;

    @Column({ unique: true })
    public phone: string;

    @Column({ nullable: true })
    public avatar?: string;

    @Exclude()
    @Column({ select: false })
    public password?: string;

    @Column({
        unique: true,
        length: 18
    })
    public username: string;

    @Column({ nullable: true })
    public latitude: string;

    @Column({ nullable: true })
    public longitude: string;

    @Column()
    public passport: string;

    @Column({
        type: 'enum',
        enum: GenderType,
        nullable: false
    })
    public gender: GenderType;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.Fermer
    })
    public role: Role;

    @ManyToOne(() => Regions, region => region.users)
    public region: Regions;

    @Column()
    public regionId: number;

    @OneToMany(type => ContractsUserUsers, contractsUserUsers => contractsUserUsers.user)
    public contracts: Contract[];

    @OneToMany(() => Sensor, sensor => sensor.user)
    public sensors: Sensor[];

    @CreateDateColumn()
    public createdAt: Date;


}