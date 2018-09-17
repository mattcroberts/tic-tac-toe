import { Document, model, Schema } from "mongoose";

import hasWon from "../../utils/hasWon";
import GridItem, {
    GridItemSchema,
    IGridItem,
    IGridItemModel
} from "../GridItem";
import { IPlayerModel, SYMBOL } from "../Player";

interface IGrid {
    _gridItems: [IGridItemModel];
    gridItems: [IGridItem[]];
    players: [IPlayerModel];
    currentPlayer: IPlayerModel;
    winner: IPlayerModel | null;
    isFinished: boolean;
    size: number;
    checkWinner(): void;
    isDraw(): boolean;
    placePlayer(player: IPlayerModel, x: number, y: number): void;
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
            type: Schema.Types.ObjectId,
            ref: "Player"
        },
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: "Player"
            }
        ],
        isFinished: {
            default: false,
            type: Boolean
        },
        size: {
            default: 3,
            type: Number
        },
        winner: {
            type: Schema.Types.ObjectId,
            ref: "Player"
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
    player: IPlayerModel,
    x: number,
    y: number
) {
    this._gridItems[x * this.size + y].set(`player`, player);

    this.checkWinner();

    this.currentPlayer = this.players.find(
        p => p.symbol !== this.currentPlayer.symbol
    )!;
});

gridSchema.method("checkWinner", function(this: IGridModel) {
    if (hasWon(SYMBOL.NAUGHT, this)) {
        this.winner = this.players.find(p => p.symbol === SYMBOL.NAUGHT)!;
    } else if (hasWon(SYMBOL.CROSS, this)) {
        this.winner = this.players.find(p => p.symbol === SYMBOL.CROSS)!;
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
