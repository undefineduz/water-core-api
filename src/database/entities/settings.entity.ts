import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Settings {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public readonly key: string;

    @Column()
    public value: string;
}