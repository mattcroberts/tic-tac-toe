import { IResolverObject } from 'graphql-tools';
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
            { player, x, y }: { player: Player; x: number; y: number }
        ) {
            grid.placePlayer(player, x, y);

            grid.checkWinner();
            return grid;
        }
    }
};
