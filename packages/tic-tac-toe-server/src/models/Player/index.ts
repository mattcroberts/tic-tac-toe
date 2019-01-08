import { Document, model, Schema } from "mongoose";

export enum ISymbol {
    NAUGHT = "NAUGHT",
    CROSS = "CROSS"
}

enum PlayerType {
    ANONYMOUS
}

interface IPlayer {
    symbol: ISymbol;
    type: PlayerType;
}

export interface IPlayerModel extends IPlayer, Document {}

const PlayerSchema = new Schema({
    symbol: {
        enum: Object.keys(ISymbol),
        type: String
    },
    type: {
        enum: Object.keys(PlayerType),
        type: String,
        default: PlayerType.ANONYMOUS
    }
});

export default model<IPlayerModel>("Player", PlayerSchema);
