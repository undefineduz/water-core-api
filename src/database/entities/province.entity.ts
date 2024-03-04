import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('provinces')
export class Province {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;
}