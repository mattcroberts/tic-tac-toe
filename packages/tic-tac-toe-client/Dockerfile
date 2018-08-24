FROM node:8-alpine

ARG REACT_APP_API_URI
ENV REACT_APP_API_URI=$REACT_APP_API_URI
RUN groupadd -g 999 nodejs && useradd -m -r -u 999 -g nodejs nodejs
RUN mkdir -p /home/nodejs/app
RUN chown -R nodejs:nodejs /home/nodejs
USER nodejs

WORKDIR /home/nodejs/app
COPY . .

RUN yarn install
RUN yarn build
