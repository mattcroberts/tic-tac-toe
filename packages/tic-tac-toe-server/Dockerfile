FROM node:8-alpine

WORKDIR /home/nodejs/app
RUN chown node:node .
USER node

COPY --chown=node:node tsconfig.json ../..
COPY --chown=node:node packages/tic-tac-toe-server .

RUN yarn

ENV NODE_ENV=production
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
