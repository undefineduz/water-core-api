import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Regions } from "./region.entity";

@Entity()
export class States {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Regions, region => region.state)
    public regions: Regions[];
}