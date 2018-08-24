import Grid, { IGridModel } from "../../models/Grid";
import GridItem from "../../models/GridItem";
import Player from "../../models/Player";

export const query = {
    Query: {
        async grid(_: any, { id }: { id: string }) {
            let grid;
            if (id) {
                grid = Grid.findById(id);
            } else {
                throw new Error("No ID Provided");
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
                player,
                x,
                y
            }: { id: string; player: Player; x: number; y: number }
        ) {
            const grid = await Grid.findById(id);

            if (grid) {
                grid.placePlayer(player, x, y);
                await grid.save();
                return grid;
            } else {
                throw new Error("Grid not found:" + id);
            }
        },
        async newGame() {
            const grid = new Grid();
            await grid.save();
            return grid;
        }
    }
};
