FROM node:8-alpine

ARG API_URI
ENV API_URI=$API_URI

ARG WS_URI
ENV WS_URI=$WS_URI

RUN apk update && apk add util-linux alpine-sdk && rm -rf /var/cache/apk/*

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nodejs -G nodejs
RUN mkdir -p /home/nodejs/app
RUN chown -R nodejs:nodejs /home/nodejs
USER nodejs

WORKDIR /home/nodejs/app
COPY . .

RUN yarn install && yarn build --detailed-report --no-cache
ENV NODE_ENV=production
CMD ["yarn", "start"]
