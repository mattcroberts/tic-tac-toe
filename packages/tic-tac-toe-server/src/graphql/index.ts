import * as fs from "fs";
import { makeExecutableSchema } from "graphql-tools";
import { join } from "path";
import * as gridResolver from "./grid/resolver";
import * as tictactoeResolver from "./tictactoe/resolver";
import logger from '../logger';

const schema = fs.readFileSync(join(__dirname, "./schema.graphql"), "utf8");

export const Schema = makeExecutableSchema({
    logger: {
        log: (message: string | Error): void => {
            logger.info(message);
        }
    },
    resolvers: [gridResolver, tictactoeResolver],
    typeDefs: schema
});
