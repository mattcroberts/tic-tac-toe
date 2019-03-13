import cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import { execute, subscribe } from "graphql";
import dotenv from "dotenv";
import Koa from "koa";
import { createServer } from "http";
import koabody from "koa-body";
import Router from "koa-router";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { connectWithRetry } from "./db";

import { Schema } from "./graphql";

dotenv.config();

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

process.on("unhandledRejection", err => {
    console.log(err);
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
        console.log("listening on 3000");
    });
})();
