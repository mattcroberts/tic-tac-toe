import * as fs from "fs";
import { ILogger, makeExecutableSchema } from "graphql-tools";
import { join } from "path";

import Grid from "../models/Grid";
import Player from "../models/Player";
import { mutation, query } from "./grid/resolver";

const schema = fs.readFileSync(join(__dirname, "./schema.graphql"), "utf8");

export const Schema = makeExecutableSchema({
    logger: {
        log: (message: string | Error): void => {
            console.log(message);
        }
    },
    resolvers: [
        {
            Mutation: mutation.Mutation,
            Query: query.Query
        }
    ],
    typeDefs: schema
});
