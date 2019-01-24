import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
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
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int" })
    x: number;

    @Column({ type: "int" })
    y: number;

    @ManyToOne(type => Grid, grid => grid._gridItems)
    grid!: Grid;

    @OneToOne(type => Player, { nullable: true })
    @JoinColumn()
    player: Player | null = null;
}
