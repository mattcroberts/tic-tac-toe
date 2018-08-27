FROM node:8-alpine

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nodejs -G nodejs
RUN mkdir /home/nodejs/app
RUN chown -R nodejs:nodejs /home/nodejs
USER nodejs

WORKDIR /home/nodejs/app

COPY . .

RUN yarn install --production && yarn cache clean

EXPOSE 3000

CMD [ "npm", "start" ]