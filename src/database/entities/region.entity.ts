import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { States } from "./state.entity";
import { User } from "./user.entity";

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

    @OneToMany(type => User, user => user.region)
    public users: User[];
}