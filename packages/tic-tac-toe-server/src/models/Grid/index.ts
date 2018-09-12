import { Document, model, Schema } from "mongoose";

import hasWon from "../../hasWon";
import GridItem, {
    GridItemSchema,
    IGridItem,
    IGridItemModel
} from "../GridItem";
import Player from "../Player";

interface IGrid {
    _gridItems: [IGridItemModel];
    gridItems: [IGridItem[]];
    currentPlayer: Player;
    winner: Player | null;
    isFinished: boolean;
    size: number;
    checkWinner(): void;
    isDraw(): boolean;
    placePlayer(player: Player, x: number, y: number): void;
}

export interface IGridModel extends IGrid, Document {}

const gridSchema = new Schema(
    {
        _gridItems: {
            default() {
                return [...new Array<IGridItem>(9)].map(
                    (_, i) => new GridItem({ x: Math.floor(i / 3), y: i % 3 })
                );
            },
            type: [GridItemSchema]
        },
        currentPlayer: {
            default: Player.NAUGHT,
            enum: Object.keys(Player),
            type: String
        },
        isFinished: {
            default: false,
            type: Boolean
        },
        size: {
            default: 3,
            type: Number
        },
        winner: {
            enum: Object.keys(Player),
            type: String
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

gridSchema.virtual("gridItems").get(function(this: IGridModel) {
    return this._gridItems.reduce<IGridItem[][]>((acc, item, i) => {
        const x = Math.floor(i / this.size);
        const y = i % this.size;
        if (!acc[x]) {
            acc[x] = new Array<IGridItem>();
        }
        acc[x][y] = item;
        return acc;
    }, new Array<IGridItem[]>());
});

gridSchema.method("placePlayer", function(
    this: IGridModel,
    player: Player,
    x: number,
    y: number
) {
    this._gridItems[x * this.size + y].set(`player`, player);

    this.checkWinner();

    this.currentPlayer =
        this.currentPlayer === Player.NAUGHT ? Player.CROSS : Player.NAUGHT;
});

gridSchema.method("checkWinner", function(this: IGridModel) {
    if (hasWon(Player.NAUGHT, this)) {
        this.winner = Player.NAUGHT;
    } else if (hasWon(Player.CROSS, this)) {
        this.winner = Player.CROSS;
    }

    if (this.winner || this.isDraw()) {
        this.isFinished = true;
    }
});

gridSchema.method("isDraw", function(this: IGridModel) {
    return !this.gridItems.some(row => {
        return row.some(item => !item.player);
    });
});

const Grid = model<IGridModel>("Grid", gridSchema);

export default Grid;
