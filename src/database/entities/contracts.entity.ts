import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocalFile } from "./file.entity";
import { User } from "./user.entity";
import { ContractsUserUsers } from "./contracts-user-users.entity";

@Entity('contracts')
export class Contract {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @JoinColumn({ name: 'fileId' })
    @ManyToOne(
        () => LocalFile,
        {
            nullable: true
        }
    )
    public file?: LocalFile;

    @Column({ nullable: true })
    public fileId?: number;

    @OneToMany(() => ContractsUserUsers, (contractsUserUsers) => contractsUserUsers.contract, { cascade: true })
    public contractsUsers: ContractsUserUsers[]

    @CreateDateColumn()
    public createdAt: Date;
  filename: any;
} 