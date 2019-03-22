FROM node:8-alpine

RUN apk update && apk add util-linux alpine-sdk && rm -rf /var/cache/apk/*

WORKDIR /home/node/app
RUN chown node:node .
USER node
COPY --chown=node:node . .

RUN yarn
ENV NODE_ENV=production

RUN yarn build --detailed-report --no-cache && yarn --production
CMD ["yarn", "start:prod"]
