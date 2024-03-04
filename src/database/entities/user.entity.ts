import { Exclude } from "class-transformer";
import { GenderType, Role } from "src/common/enums";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from "./contracts.entity";

@Entity('users')
@Index(["firstName", "lastName"])
@Index(["firstName", "middleName", "lastName"], { unique: true })
export class User {
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

    @Column()
    public latitude: string;

    @Column()
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

    @OneToMany(type => Contract, contract => contract.id)
    public contracts: Contract[];

    @CreateDateColumn()
    public createdAt: Date;

}