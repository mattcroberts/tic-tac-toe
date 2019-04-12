import { ApolloServer } from "apollo-server-koa";
import { execute, subscribe } from "graphql";
import dotenv from "dotenv";
import Koa from "koa";
import { createServer } from "http";
import koabody from "koa-body";
import Router from "koa-router";
import koaBunyanLogger from "koa-bunyan-logger";
import { SubscriptionServer } from "subscriptions-transport-ws";

import logger from "./logger";
logger.info("dotenv", dotenv.config());

import { connectWithRetry } from "./db";

import { Schema } from "./graphql";

const app = new Koa();
const router = new Router();
const apolloServer = new ApolloServer({
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

(async () => {
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
})();
