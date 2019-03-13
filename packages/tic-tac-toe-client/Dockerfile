FROM node:8-alpine

RUN apk update && apk add util-linux alpine-sdk && rm -rf /var/cache/apk/*

WORKDIR /home/node/app
RUN chown node:node .
USER node
COPY --chown=node:node . .

RUN yarn
ENV NODE_ENV=production

ARG API_URI
ENV API_URI=$API_URI

ARG WS_URI
ENV WS_URI=$WS_URI

RUN yarn build --detailed-report --no-cache
CMD ["yarn", "start:prod"]
