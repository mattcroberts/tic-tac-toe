import { VError, WError } from "verror";
import { withFilter } from "apollo-server-koa";
import Grid from "../../models/Grid";
import Player, { ISymbol, IPlayerType } from "../../models/Player";
import { default as GridItem, IGridItem } from "../../models/GridItem";
import pubsub from "../pubsub";
import gridDataLoader from "../../dataLoaders/grid";
import playerDataLoader from "../../dataLoaders/player";
import logger from "../../logger";

export const Query = {
    async grid(_: any, { id }: { id: string }) {
        logger.info("loading grid", id);
        const grid = await gridDataLoader.findById(id);

        if (!id || !grid) {
            throw new Error("Grid not found");
        }
        logger.info("grid found", grid.id);
        return grid;
    }
};

export const Mutation = {
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
            const grid = await gridDataLoader.findById(id);

            if (!grid) {
                throw new Error("Grid not found:" + id);
            }

            const player = await playerDataLoader.findById(playerId);

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
            logger.error(e);
            throw new WError(e, "Execute Turn Error grid:" + id);
        }
    },
    async newGame() {
        logger.info("Creating new grid");

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

        return grid.save();
    }
};

export const Subscription = {
    gridUpdated: {
        resolve: (payload: any) => {
            logger.info("resolve subscription", payload.gridUpdated.id);
            return gridDataLoader.findById(payload.gridUpdated.id);
        },
        subscribe: withFilter(
            () => pubsub.asyncIterator("gridUpdated"),
            (payload, variables) => {
                if (payload && payload.gridUpdated) {
                    logger.info("gridUpdated", payload.gridUpdated.id);
                    return payload.gridUpdated.id === variables.id;
                }
                return false;
            }
        )
    }
};
