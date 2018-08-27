FROM node:8-alpine

ENV NODE_ENV=production

ARG REACT_APP_API_URI
ENV REACT_APP_API_URI=$REACT_APP_API_URI

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nodejs -G nodejs
RUN mkdir -p /home/nodejs/app
RUN chown -R nodejs:nodejs /home/nodejs
USER nodejs

WORKDIR /home/nodejs/app
COPY . .

RUN yarn install
RUN yarn build
