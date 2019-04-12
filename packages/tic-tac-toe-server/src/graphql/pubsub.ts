// tslint:disable-next-line no-reference
/// <reference path="../@types/graphql-postgres-subscriptions/index.d.ts" />
import { PostgresPubSub } from "graphql-postgres-subscriptions";
import logger from "../logger";

const pubsub = new PostgresPubSub({
    user: process.env.PUBSUB_USERNAME,
    password: process.env.PUBSUB_PASSWORD,
    host: process.env.PUBSUB_HOST,
    database: process.env.PUBSUB_DATABASE
});

pubsub.subscribe("error", logger.error);

export default pubsub;
