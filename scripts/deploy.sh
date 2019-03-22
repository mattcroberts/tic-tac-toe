#!/bin/bash

docker ps -a

export TAG=${1:-latest}

echo "TAG=$TAG"
source "${BASH_SOURCE%/*}/secrets.sh"

docker volume create volumerize-credentials
docker volume create volumerize-cache
docker volume create pg-data

docker-compose -f docker-compose.do.yml up -d

docker ps -a

curl --fail https://irix.dev/tictactoe