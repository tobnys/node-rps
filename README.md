# node-rps

Simple rock paper scissors backend simulator.

Made using Node & Typescript.

## How to use

```yarn compile``` to compile the typescript.

```yarn start``` to start the server.

Use Postman or any other API client to test the routes defined below.

## API definitions

### GET /v1/games
Retrieves a list of all current (in memory) games.

### GET /v1/games/{id}
Retrieves data about a game by ID.

### POST /v1/games/create
Creates a game state, storing it in memory and returns a game ID.

### POST /v1/games/{id}/join
Joins the provided game by ID and player name.

Requires a name field in the request body.

Example: 
{
    name: "Tobias"
}

### POST /v1/games/{id}/move
Performs a move on the provided game by ID.

Requires a name & move field in the request body.

Example: 
{
    name: "Tobias",
    move: "rock"
}