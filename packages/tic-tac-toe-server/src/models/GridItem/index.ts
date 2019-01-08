import { Document, model, Schema } from "mongoose";
import { ISymbol } from "../Player";

export interface IGridItem {
    x: number;
    y: number;
    player: ISymbol | null;
}

export interface IGridItemModel extends IGridItem, Document {}

export const GridItemSchema = new Schema(
    {
        player: {
            enum: Object.keys(ISymbol),
            type: String
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
    return this._id.toString();
});

export default model<IGridItemModel>("GridItem", GridItemSchema);
