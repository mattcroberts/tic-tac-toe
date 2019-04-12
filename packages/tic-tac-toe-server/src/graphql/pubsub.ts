// tslint:disable-next-line no-reference
/// <reference path="../@types/graphql-postgres-subscriptions/index.d.ts" />
import { PostgresPubSub } from "graphql-postgres-subscriptions";
import logger from "../logger";

const pubsub = new PostgresPubSub({
    user: process.env.POSTGRES_USERNAME,
    host: "postgres",
    database: process.env.DATABASE,
    password: process.env.POSTGRES_PASSWORD
});

pubsub.subscribe("error", logger.error);

export default pubsub;
