import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany
} from "typeorm";
import Grid from "../Grid";

export enum ISymbol {
    NAUGHT = "NAUGHT",
    CROSS = "CROSS"
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

    @ManyToMany(type => Grid)
    grids!: Grid[];

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "enum", enum: ISymbol })
    symbol: ISymbol;

    @Column({ type: "enum", enum: IPlayerType })
    type: IPlayerType;
}
