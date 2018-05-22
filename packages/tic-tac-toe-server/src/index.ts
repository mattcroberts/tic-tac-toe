import cors from "@koa/cors";
import { graphiqlKoa, graphqlKoa } from "apollo-server-koa";
import Koa from "koa";
import koabody from "koa-bodyparser";
import Router from "koa-router";
import { Schema } from "./schemas";

const app = new Koa();
const router = new Router();

app.use(cors());

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
app.listen(3000);
console.log("listening on 3000");
