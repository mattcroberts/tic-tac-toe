FROM node:8

RUN groupadd -g 999 nodejs && useradd -m -r -u 999 -g nodejs nodejs
RUN mkdir -p /home/nodejs/app
RUN chown -R nodejs:nodejs /home/nodejs
USER nodejs

WORKDIR /home/nodejs/app
COPY . .

RUN yarn install
RUN yarn build
