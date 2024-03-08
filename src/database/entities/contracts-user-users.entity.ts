import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { Contract } from "./contracts.entity";
import { ContractStatus } from "src/common/enums";

@Entity()
@Unique(['userId', 'contractId'])
export class ContractsUserUsers {
    @PrimaryGeneratedColumn()
    public id: number;

    @JoinColumn({ name: 'userId' })
    @ManyToOne(
        () => User,
        {
            nullable: true
        }
    )
    public user?: User;

    @Column({ nullable: true })
    public userId?: number;

    @JoinColumn({ name: 'contractId' })
    @ManyToOne(
        () => Contract,
        {
            nullable: true
        }
    )
    public contract?: User;

    @Column({ nullable: true })
    public contractId?: number;

    @Column({
        type: 'enum',
        enum: ContractStatus,
        default: ContractStatus.PENDING
    })
    public status: ContractStatus;

    @CreateDateColumn()
    public createdAt: Date;
}