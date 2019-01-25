import { VError, WError } from "verror";
import Grid from "../../models/Grid";
import Player, { ISymbol, IPlayerType } from "../../models/Player";
import { default as GridItem, IGridItem } from "../../models/GridItem";
import pubsub from "../pubsub";
import gridController from "../../controllers/grid";
import playerController from "../../controllers/player";

export const query = {
    Query: {
        async grid(_: any, { id }: { id: string }) {
            let grid = await gridController.findById(id);

            if (!id || !grid) {
                throw new Error("Grid not found");
            }

            return grid;
        }
    }
};

export const mutation = {
    Mutation: {
        async executeTurn(
            _: any,
            {
                id,
                playerId,
                x,
                y
            }: { id: string; playerId: string; x: number; y: number }
        ) {
            try {
                const grid = await gridController.findById(id);

                if (!grid) {
                    throw new Error("Grid not found:");
                }

                const player = await playerController.findById(playerId);

                if (grid.currentPlayer.id !== player.id) {
                    throw new VError(
                        `Not current player ${
                            grid.currentPlayer
                        } expected ${player}`
                    );
                }
                grid.placePlayer(player, x, y);
                await grid.save();
                pubsub.publish("gridUpdated", { gridUpdated: grid });
                return grid;
            } catch (e) {
                console.error(e);
                throw new WError(e, "Execute Turn Error grid:" + id);
            }
        },
        async newGame() {
            const grid = new Grid();
            grid.players = [
                new Player(ISymbol.NAUGHT, IPlayerType.ANONYMOUS),
                new Player(ISymbol.CROSS, IPlayerType.ANONYMOUS)
            ];

            await Promise.all(grid.players.map(player => player.save()));
            grid.currentPlayer = grid.players[0];
            grid._gridItems = [...new Array<IGridItem>(9)].map(
                (_, i) => new GridItem(Math.floor(i / 3), i % 3)
            );

            return await grid.save();
        }
    }
};
