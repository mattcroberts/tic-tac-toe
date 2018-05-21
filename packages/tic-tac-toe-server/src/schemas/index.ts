import { ILogger, makeExecutableSchema } from "graphql-tools";
import { Grid } from "../models/Grid";
import * as typeDefs from "./typedefs";

export const Schema = makeExecutableSchema({
    logger: {
        log: (message: string | Error): void => {
            console.log(message);
        }
    },
    resolvers: [
        {
            Query: {
                getGrid() {
                    return new Grid();
                }
            }
        }
    ],
    typeDefs: Object.values(typeDefs)
});
