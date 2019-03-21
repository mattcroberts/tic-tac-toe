#!/bin/bash

docker_compose_path=$( realpath "$1" )

docker ps -a

export API_URI=/tictactoe/graphql
export TAG=latest
source "${BASH_SOURCE%/*}/secrets.sh"

docker volume create volumerize-credentials
docker volume create volumerize-cache
docker volume create pg-data

source "${BASH_SOURCE%/*}/init-letsencrypt.sh" $docker_compose_path

docker ps -a

curl --fail https://irix.dev/tictactoe