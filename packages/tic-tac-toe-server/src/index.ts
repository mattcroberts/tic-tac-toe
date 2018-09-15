import cors from "@koa/cors";
import { graphiqlKoa, graphqlKoa } from "apollo-server-koa";
import dotenv from "dotenv";
import Koa from "koa";
import koabody from "koa-bodyparser";
import Router from "koa-router";
import mongoose from "mongoose";
import { Schema } from "./graphql";

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(
    cors({
        maxAge: 86400 // One day
    })
);
app.use(koabody());

router.get("/ping", async ctx => {
    ctx.body = "pong";
});

router.get(
    "/graphql",
    graphqlKoa({
        schema: Schema
    })
);
router.post(
    "/graphql",
    graphqlKoa({
        schema: Schema
    })
);

router.get(
    "/graphiql",
    graphiqlKoa({
        endpointURL: "/graphql"
    })
);

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
        console.error(err, "connection faile");
    }
    await connected;

    app.listen(3000, () => {
        console.log("listening on 3000");
    });
})();
