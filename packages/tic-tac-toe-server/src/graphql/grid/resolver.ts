import Grid from "../../models/Grid";
import Player, { ISymbol, IPlayerType } from "../../models/Player";
import { default as GridItem, IGridItem } from "../../models/GridItem";
import pubsub from "../pubsub";

export const query = {
    Query: {
        async grid(_: any, { id }: { id: string }) {
            let grid: Grid | null = null;

            if (id) {
                try {
                    grid = await Grid.findOneOrFail(id, {
                        relations: [
                            "currentPlayer",
                            // "winner",
                            "players",
                            "_gridItems"
                        ]
                    });
                } catch (e) {
                    console.error(e);
                }
            } else {
                throw new Error("No ID Provided");
            }
            if (!grid) {
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
                player: playerId,
                x,
                y
            }: { id: string; player: string; x: number; y: number }
        ) {
            try {
                const grid = await Grid.findOneOrFail(id);
                const player = await Player.findOneOrFail(playerId);

                if (grid.currentPlayer.id !== player.id) {
                    throw new Error(
                        `Not current player ${grid.currentPlayer}:${player}`
                    );
                }
                grid.placePlayer(player, x, y);
                await grid.save();
                pubsub.publish("gridUpdated", { gridUpdated: grid });
                return grid;
            } catch (e) {
                console.error(e);
                throw new Error("Grid not found:" + id);
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
