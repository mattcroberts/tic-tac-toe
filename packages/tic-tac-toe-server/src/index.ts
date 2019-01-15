import cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import koaPlayground from "graphql-playground-middleware-koa";
import { execute, subscribe } from "graphql";
import dotenv from "dotenv";
import Koa from "koa";
import { createServer } from "http";
import koabody from "koa-body";
import Router from "koa-router";
import mongoose from "mongoose";
import { SubscriptionServer } from "subscriptions-transport-ws";

import { Schema } from "./graphql";

dotenv.config();

const WS_PORT = 5000;
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
    subscriptionEndpoint: "ws://localhost:5000/graphql"
}) as any);

app.use(router.routes());

(async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("Missing MONGO_URI");
    }

    if (process.env.NODE_ENV === "development") {
        console.log(`Connecting to DB at ${mongoUri}`);
    }

    const mongoConnection = mongoose.connection;

    const connected = new Promise(resolve => {
        mongoConnection.once("connected", (...args) => {
            return resolve(args);
        });
    });

    try {
        mongoose.connect(
            mongoUri,
            {
                autoReconnect: true,
                reconnectInterval: 5
            }
        );
    } catch (err) {
        console.error(err, "connection failed");
    }
    await connected;

    const websocketServer = createServer((request, response) => {
        response.writeHead(404);
        response.end();
    });

    // Bind it to port and start listening
    websocketServer.listen(WS_PORT, () =>
        console.log(`Websocket Server is now running on localhost:${WS_PORT}`)
    );

    SubscriptionServer.create(
        {
            schema: Schema,
            execute,
            subscribe
        },
        {
            server: websocketServer,
            path: "/ws"
        }
    );

    app.listen(3000, () => {
        console.log("listening on 3000");
    });
})();
