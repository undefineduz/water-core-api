import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { States } from "./state.entity";

@Entity()
export class Regions {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => States, (state) => state.regions, { nullable: false })
    state: States;

    @Column({ nullable: false })
    stateId: number;

    @Column({ unique: true })
    name: string;
}