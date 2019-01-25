import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
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

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ type: "int" })
    public x: number;

    @Column({ type: "int" })
    public y: number;

    @ManyToOne(type => Grid, grid => grid._gridItems)
    public grid!: Grid;

    @ManyToOne(type => Player, { nullable: true })
    @JoinColumn()
    public player!: Player | null;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    public toString() {
return `id=${this.id} xy=${this.x},${this.y} player=${this.player}`
    }
}
