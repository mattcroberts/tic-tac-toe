// tslint:disable-next-line no-reference
/// <reference path="../@types/graphql-postgres-subscriptions/index.d.ts" />
import { PostgresPubSub } from "graphql-postgres-subscriptions";
import { getManager } from "typeorm";
import logger from "../logger";
import Grid from "../models/Grid";

const commonMessageHandler = (payload: any) => {
    const manager = getManager();
    if (payload.gridUpdated) {
        const grid = manager.create(Grid, payload.gridUpdated);
        return {
            ...payload,
            gridUpdated: grid
        };
    }
    return payload;
};

const pubsub = new PostgresPubSub({
    user: process.env.PUBSUB_USERNAME,
    password: process.env.PUBSUB_PASSWORD,
    host: process.env.PUBSUB_HOST,
    database: process.env.PUBSUB_DATABASE,
    commonMessageHandler
});

pubsub.subscribe("error", err => {
    logger.error(err);
});

export default pubsub;
