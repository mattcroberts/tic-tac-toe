import Grid from "../../models/Grid";
import { ISymbol } from "../../models/Player";
import pubsub from "../pubsub";

export const query = {
    Query: {
        async grid(_: any, { id }: { id: string }) {
            // let grid;
            // if (id) {
            //     grid = await Grid.findById(id)
            //         .populate("players")
            //         .populate("currentPlayer")
            //         .exec();
            // } else {
            //     throw new Error("No ID Provided");
            // }
            // if (!grid) {
            //     throw new Error("Grid not found");
            // }
            // return grid;
        }
    }
};

export const mutation = {
    Mutation: {
        async executeTurn(
            _: any,
            {
                id,
                player,
                x,
                y
            }: { id: string; player: ISymbol; x: number; y: number }
        ) {
            // const grid = await Grid.findById(id)
            //     .populate("players")
            //     .populate("currentPlayer")
            //     .exec();

            // if (grid) {
            //     if (grid.currentPlayer.symbol !== player) {
            //         throw new Error(
            //             `Not current player ${
            //                 grid.currentPlayer.symbol
            //             }:${player}`
            //         );
            //     }
            //     grid.placePlayer(player, x, y);
            //     await grid.save();
            //     pubsub.publish("gridUpdated", { gridUpdated: grid });
            //     return grid;
            // } else {
            //     throw new Error("Grid not found:" + id);
            // }
        },
        async newGame() {
            const grid = new Grid();
            await grid.save();
            return grid;
        }
    }
};
