import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('coordinations')
export class Coordinations {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'float',
    })
    public h: number;

    @Column()
    public q: number;
}