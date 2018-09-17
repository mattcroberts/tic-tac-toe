import { Document, model, Schema } from "mongoose";
import { IPlayerModel } from "../Player";

export interface IGridItem {
    x: number;
    y: number;
    player: IPlayerModel | null;
}

export interface IGridItemModel extends IGridItem, Document {}

export const GridItemSchema = new Schema(
    {
        player: {
            type: Schema.Types.ObjectId,
            ref: "Player"
        },
        x: {
            required: true,
            type: Number
        },
        y: {
            required: true,
            type: Number
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

GridItemSchema.virtual("id").get(function(this: IGridItemModel) {
    return this._id;
});

export default model<IGridItemModel>("GridItem", GridItemSchema);
