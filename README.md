# node-rps

Simple rock paper scissors backend simulator.

Made using Node & Typescript.

## How to use

yarn compile to compile the typescript.

yarn start to start the server.

Use Postman or any other API client to test the routes defined below.

## API definitions

### GET /v1/games
Retrieves a list of all current (in memory) games.

### GET /v1/games/:id
Retrieves data about a game by ID.

### POST /v1/game/create
Creates a game state, storing it in memory and returns a game ID.

### /v1/games
Retrieves a list of all current (in memory) games.