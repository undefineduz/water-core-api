import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Contract } from "./contracts.entity";
import { ContractStatus } from "src/common/enums";

@Entity('contracts_user_users')
@Unique(['userId', 'contractId'])
export class ContractsUserUsers {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public report?: string;

    @JoinColumn({ name: 'userId' })
    @ManyToOne(
        () => User,
        (user) => user.contractsUsers,
        {
            onDelete: 'CASCADE',
            nullable: true
        }
    )
    public user?: User;

    @Column({ nullable: true })
    public userId?: number;

    @JoinColumn({ name: 'contractId' })
    @ManyToOne(
        () => Contract,
        (contract) => contract.contractsUsers,
        {
            onDelete: 'CASCADE',
            nullable: true
        }
    )
    public contract?: Contract;

    @Column({ nullable: true })
    public contractId?: number;

    @Column({
        type: 'enum',
        enum: ContractStatus,
        default: ContractStatus.PENDING
    })
    public status: ContractStatus;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;
  file: any;
}