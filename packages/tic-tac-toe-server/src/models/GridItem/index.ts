import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ISymbol, IPlayerType } from "../Player";

export interface IGridItem {
    x: number;
    y: number;
    player: ISymbol | null;
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

    @Column({ type: "enum", enum: ISymbol }) // TODO make this use Player type
    player: ISymbol | null = null;
}
