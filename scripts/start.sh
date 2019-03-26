#!/bin/bash

source ./scripts/env.sh


docker-compose -p ttt up -d

if [ -n "$1" ]; then
    docker exec -it ttt_backups_1 restore
else
    echo "skipping DB restore"
fi