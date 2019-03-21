#!/bin/bash

docker ps -a

export API_URI=/tictactoe/graphql
export TAG=latest
source ./secrets.sh

docker volume create volumerize-credentials
docker volume create volumerize-cache
docker volume create pg-data

docker-compose -f docker-compose.do.yml up -d

docker ps -a

curl --fail http://localhost/tictactoe