import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import Grid, { IGrid } from "../Grid";

export enum ISymbol {
    NAUGHT,
    CROSS
}

export enum IPlayerType {
    ANONYMOUS
}

export interface IPlayer {
    id: number;
    symbol: ISymbol;
    type: IPlayerType;
}

@Entity()
export default class Player extends BaseEntity implements IPlayer {
    constructor(symbol: ISymbol, type: IPlayerType) {
        super();
        this.symbol = symbol;
        this.type = type;
    }

    @ManyToOne(type => Grid, grid => grid.players)
    grid: IGrid | null = null;

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "enum", enum: ISymbol })
    symbol: ISymbol;

    @Column({ type: "enum", enum: IPlayerType })
    type: IPlayerType;
}
