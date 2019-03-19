#!/bin/bash

docker ps -a

source secrets.sh

docker-compose -f docker-compose.do.yml up

docker ps -a