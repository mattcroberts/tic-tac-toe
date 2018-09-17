import { Document, model, Schema } from "mongoose";

export enum SYMBOL {
    NAUGHT = "NAUGHT",
    CROSS = "CROSS"
}

enum PlayerType {
    ANONYMOUS
}

interface IPlayer {
    symbol: SYMBOL;
    type: PlayerType;
}

export interface IPlayerModel extends IPlayer, Document {}

const PlayerSchema = new Schema({
    symbol: {
        enum: Object.keys(SYMBOL),
        type: String
    },
    type: {
        enum: Object.keys(PlayerType),
        type: String
    }
});

export default model<IPlayerModel>("Player", PlayerSchema);
