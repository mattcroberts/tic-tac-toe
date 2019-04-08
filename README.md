# Tic Tac Toe

Build Status: [![CircleCI](https://circleci.com/gh/mattcroberts/tic-tac-toe/tree/master.svg?style=svg)](https://circleci.com/gh/mattcroberts/tic-tac-toe/tree/master) [![codecov](https://codecov.io/gh/mattcroberts/tic-tac-toe/branch/master/graph/badge.svg)](https://codecov.io/gh/mattcroberts/tic-tac-toe)

A tic tac toe game built using node, Typescript, Graphql (Apollo), Koa, React, Jest, Docker, Postgres, TypeORM, CircleCI

Play the game here: https://irix.dev/tictactoe

## Getting Started

Prerequisites: Docker, Node 8, Yarn

1. Clone repo
2. yarn
3. yarn start
   1. yarn start restore (to restore db from backup, make sure secrets are set)
4. Navigate to http://localhost/tictactoe

### Secrets

For production, expose the following environment variables in scripts/env.sh

```bash
export POSTGRES_USERNAME=
export POSTGRES_PASSWORD=
export VOLUMERIZE_TARGET=
export GOOGLE_DRIVE_ID=
export GOOGLE_DRIVE_SECRET=
```

## Developing

Prerequisites: Docker, Yarn

1. Clone repo
2. yarn
3. yarn dev
