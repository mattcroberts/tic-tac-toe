import hasWon from "../../utils/hasWon";
import GridItem from "../GridItem";
import Player, { ISymbol } from "../Player";
import {
    BaseEntity,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
    JoinColumn,
    ManyToMany,
    JoinTable
} from "typeorm";

export interface IGrid {
    _gridItems: GridItem[];
    gridItems: GridItem[][];
    players: Player[];
    currentPlayer: Player;
    winner: Player | null;
    isFinished: boolean;
    size: number;

    toGrid: () => GridItem[][];
    checkWinner(): void;
    isDraw(): boolean;
    placePlayer(player: Player, x: number, y: number): void;
}

@Entity()
export default class Grid extends BaseEntity implements IGrid {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @ManyToMany(type => Player)
    @JoinTable()
    public players!: Player[];

    @OneToOne(type => Player)
    @JoinColumn()
    public currentPlayer!: Player;

    @OneToOne(type => Player, { nullable: true })
    @JoinColumn()
    public winner!: Player | null;

    @Column({ type: "boolean" })
    public isFinished: boolean = false;

    @Column({ type: "integer" })
    public size: number = 3;

    @OneToMany(type => GridItem, gridItem => gridItem.grid, { cascade: true })
    public _gridItems!: GridItem[]; // tslint:disable-line variable-name

    get gridItems(): GridItem[][] {
        return this.toGrid();
    }

    get gameUrls() {
        const crossPlayer = this.players.find(p => p.symbol === ISymbol.CROSS);
        const naughtPlayer = this.players.find(
            p => p.symbol === ISymbol.NAUGHT
        );
        return {
            [ISymbol.CROSS]: crossPlayer
                ? `/game/${this.id}/${crossPlayer.id}`
                : "",
            [ISymbol.NAUGHT]: naughtPlayer
                ? `/game/${this.id}/${naughtPlayer.id}`
                : ""
        };
    }

    public toGrid() {
        return this._gridItems.reduce((acc, item, i) => {
            const x = Math.floor(i / this.size);
            const y = i % this.size;
            if (!acc[x]) {
                acc[x] = new Array<GridItem>();
            }
            acc[x][y] = item;
            return acc;
        }, new Array<GridItem[]>());
    }

    public checkWinner() {
        const crossPlayer = this.players.find(p => p.symbol === ISymbol.CROSS)!;
        const naughtPlayer = this.players.find(
            p => p.symbol === ISymbol.NAUGHT
        )!;
        if (hasWon(naughtPlayer, this)) {
            this.winner = naughtPlayer;
        } else if (hasWon(crossPlayer, this)) {
            this.winner = crossPlayer;
        }

        if (this.winner || this.isDraw()) {
            this.isFinished = true;
        }
    }

    public isDraw() {
        return !this.gridItems.some(row => {
            return row.some(item => !item.player);
        });
    }

    public placePlayer(player: Player, x: number, y: number) {
        const gridItem = this._gridItems[x * this.size + y];

        if (gridItem.x !== x || gridItem.y !== y) {
            throw new Error(
                `Unexpected Grid Item ${gridItem} expected ${x}, ${y}`
            );
        }

        if (!!gridItem.player) {
            throw new Error("Item already filled");
        }

        gridItem.player = player;

        this.checkWinner();

        this.currentPlayer = this.players.find(
            p => p.symbol !== this.currentPlayer.symbol
        )!;
    }
}
