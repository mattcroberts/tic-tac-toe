#!/bin/bash

export API_URI=/tictactoe/graphql
export TAG=latest
source ./scripts/env.sh

docker volume create volumerize-credentials
docker volume create volumerize-cache
docker volume create pg-data

if [ "$VOLUMERIZE_TARGET" && "$GOOGLE_DRIVE_ID" && "$GOOGLE_DRIVE_SECRET" ]; then
    docker run -it --rm \
        -v "volumerize-cache:/volumerize-cache" \
        -v "volumerize-credentials:/credentials" \
        -v "pg-data:/source" \
        -e "VOLUMERIZE_SOURCE=/source" \
        -e "VOLUMERIZE_TARGET=$VOLUMERIZE_TARGET" \
        -e "GOOGLE_DRIVE_ID=$GOOGLE_DRIVE_ID" \
        -e "GOOGLE_DRIVE_SECRET=$GOOGLE_DRIVE_SECRET" \
        blacklabelops/volumerize restore
else
    echo "skipping DB restore"
fi

docker-compose -p ttt -f docker-compose.do.yml up -d
