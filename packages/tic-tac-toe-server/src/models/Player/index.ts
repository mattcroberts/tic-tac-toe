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
    id: string;
    symbol: ISymbol;
    type: IPlayerType;
}

@Entity()
export default class Player extends BaseEntity implements IPlayer {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @ManyToMany(type => Grid)
    public grids!: Grid[];

    @Column({ type: "enum", enum: ISymbol })
    public symbol: ISymbol;

    @Column({ type: "enum", enum: IPlayerType })
    public type: IPlayerType;

    constructor(symbol: ISymbol, type: IPlayerType) {
        super();
        this.symbol = symbol;
        this.type = type;
    }

    public toString(): string {
        return `Player ${this.id} ${this.symbol}`;
    }
}
