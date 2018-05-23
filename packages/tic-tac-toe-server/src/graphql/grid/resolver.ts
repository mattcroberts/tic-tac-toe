import Grid from "../../models/Grid";
import Player from "../../models/Player";

const grid = new Grid();

export const query = {
    Query: {
        grid() {
            return grid;
        }
    }
};

export const mutation = {
    Mutation: {
        executeTurn(
            _: any,
            { player, x, y }: { player: string; x: number; y: number }
        ) {
            grid.placePlayer(
                player === "X" ? Player.CROSS : Player.NAUGHT,
                x,
                y
            );

            return grid;
        }
    }
};
