import { ILogger, makeExecutableSchema } from "graphql-tools";
import Grid from "../models/Grid";
import Player from "../models/Player";
import * as typeDefs from "./typedefs";

const grid = new Grid();
export const Schema = makeExecutableSchema({
    logger: {
        log: (message: string | Error): void => {
            console.log(message);
        }
    },
    resolvers: [
        {
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
            },
            Query: {
                getGrid() {
                    return grid;
                }
            }
        }
    ],
    typeDefs: Object.values(typeDefs)
});
