import { ApolloServer } from "apollo-server-koa";
import { execute, subscribe } from "graphql";

import Koa from "koa";
import { createServer } from "http";
import koabody from "koa-body";
import Router from "koa-router";
import koaBunyanLogger from "koa-bunyan-logger";
import { SubscriptionServer } from "subscriptions-transport-ws";

import logger from "./logger";

import { connectWithRetry } from "./db";

import { Schema } from "./graphql";

const main = async () => {
    const app = new Koa();
    const router = new Router();
    const apolloServer = new ApolloServer({
        formatError: err => {
            logger.error(err);
            return err;
        },
        schema: Schema,
        playground: {
            endpoint: "/tictactoe/graphql"
        }
    });
    apolloServer.applyMiddleware({ app });

    app.use(koabody());

    router.get("/ping", async ctx => {
        ctx.body = "pong";
    });

    app.use(router.routes());

    app.use(koaBunyanLogger());
    app.use(koaBunyanLogger.requestLogger());

    process.on("unhandledRejection", err => {
        logger.error(err);
    });

    await connectWithRetry();
    const server = createServer(app.callback());

    SubscriptionServer.create(
        {
            schema: Schema,
            execute,
            subscribe
        },
        {
            server,
            path: "/ws"
        }
    );

    server.listen(3000, () => {
        logger.info("listening on 3000");
    });
};

export default main;
