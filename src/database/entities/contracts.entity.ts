import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocalFile } from "./file.entity";
import { User } from "./user.entity";

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

    @CreateDateColumn()
    public createdAt: Date;
} 