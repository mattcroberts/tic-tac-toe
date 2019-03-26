#!/bin/bash

export API_URI=/tictactoe/graphql
export TAG=latest
source ./scripts/env.sh

docker-compose -p ttt -f docker-compose.do.yml up -d

if [ -n "$1" ]; then
    docker exec -it ttt_backups_1 restore
else
    echo "skipping DB restore"
fi
