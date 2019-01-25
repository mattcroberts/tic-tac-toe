import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import Player from "../Player";
import Grid from "../Grid";

export interface IGridItem {
    x: number;
    y: number;
    player: Player | null;
}

@Entity()
export default class GridItem extends BaseEntity implements IGridItem {
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "int" })
    x: number;

    @Column({ type: "int" })
    y: number;

    @ManyToOne(type => Grid, grid => grid._gridItems)
    grid!: Grid;

    @ManyToOne(type => Player, { nullable: true })
    @JoinColumn()
    player!: Player | null;

    toString() {
return `id=${this.id} xy=${this.x},${this.y} player=${this.player}`
    }
}
