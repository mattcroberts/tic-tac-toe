import cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import koaPlayground from "graphql-playground-middleware-koa";
import { execute, subscribe } from "graphql";
import dotenv from "dotenv";
import Koa from "koa";
import { createServer } from "http";
import koabody from "koa-body";
import Router from "koa-router";
import { SubscriptionServer } from "subscriptions-transport-ws";
import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";

import { Schema } from "./graphql";

dotenv.config();

const app = new Koa();
const router = new Router();
const apolloServer = new ApolloServer({ schema: Schema, playground: {} });
apolloServer.applyMiddleware({ app });

app.use(
    cors({
        maxAge: 86400 // One day
    })
);
app.use(koabody());

router.get("/ping", async ctx => {
    ctx.body = "pong";
});

router.all("/playground", koaPlayground({
    endpoint: "/graphql",
    subscriptionEndpoint: "ws://localhost:3000/graphql"
}) as any);

app.use(router.routes());

process.on("unhandledRejection", err => {
    console.log(err);
});

(async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("Missing MONGO_URI");
    }

    if (process.env.NODE_ENV === "development") {
        console.log(`Connecting to DB at ${mongoUri}`);
    }
    const connectionOptions = Object.assign(await getConnectionOptions(), {
        host: process.env.TYPEORM_HOST,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE
    });
    await createConnection(connectionOptions);

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

console.log(process.env);
