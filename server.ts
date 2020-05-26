// General imports
import express = require("express");
import { v4 as uuidv4 } from "uuid";

// Environment variables config
require('dotenv').config()

// General constants
const app: express.Application = express();

// Middleware
app.use(express.json())

// Game type interface
interface Game {
    id: string | null;
    firstPlayer?: string | null;
    secondPlayer?: string | null;
    firstMove?: string | null;
    secondMove?: string | null;
    result?: string | null;
}

// Global games state variable
let games: Array<Game> = [];

// Helper functions
function findGameByID(id: string): Game {
    // Traverse and find the correct game by ID
    // O(n) - Simple linear traversal
    for(let i=0; i<games.length; i++) {
        console.log("GAME TRAVERSE", games[i])
        if(games[i].id === id) {
            return games[i];
        }
    }

    // Return null if no game was found and handle status in the route handler.
    return {id: null}
}

function updateGame(game: Game, object: any): void {

}

// API handlers 
// List all games in memory
app.get("/v1/games", (req: any, res: any) => {
    res.json(games);
});

// List a specific game in memory by ID
app.get("/v1/games/:id", (req: any, res: any) => {
    // Find the game.
    let game: Game = findGameByID(req.params.id);

    // Send proper status if the game is not found.
    if(game.id === null) {
        res.status(404).send({error: `No game was found using the provided ID: ${req.params.id}`});
    } else {
        res.json(game);
    }
});

app.post("/v1/game/create", (req: any, res: any) => {
    // Create game state and push to array
    let gameObject: Game = {
        id: uuidv4(),
        firstPlayer: null,
        secondPlayer: null,
        firstMove: null,
        secondMove: null,
        result: null,
    }

    // Push the new game into the global state variable
    games.push(gameObject);

    // Return the ID of the game to the creator/user
    res.json({"ID": gameObject.id})
});

// Join a specific game
app.post("/v1/games/:id/join", (req: any, res: any) => {
    // Find the game.
    let game: Game = findGameByID(req.params.id);

    // Send proper status if the game is not found.
    if(game.id === null) {
        res.status(404).send({error: `No game was found using the provided ID: ${req.params.id}`});
    } else {
        // Create a new game variable to replace data.
        let updatedGame: object;

        console.log("REQ BODY", req.body)

        // Get the player name provided
        let playerName: string = req.body.name;

        // Make sure the request body is not empty
        if(!req.body.name) {
            res.status(400).send({error: "No data for player name was found in the body"})
        }

        console.log("PLAYER NAME", playerName);

        // Check if the first player is null, if it is then take that spot as a player.
        if(game.firstPlayer === null) {
            updatedGame = Object.assign(game, {
                firstPlayer: playerName
            });
            res.status(300).send(updatedGame);
        } else if(game.secondPlayer === null) {
            // Make sure the name is not the same as the first player name to avoid duplicate names.
            if(game.firstPlayer === playerName) {
                res.status(404).send({error: "The provided name is already in use"});
            } else {
                updatedGame = Object.assign(game, {
                    secondPlayer: playerName
                });
                res.status(300).send(updatedGame);
            }
        } else {
            res.status(404).send({error: "The game is already full"});
        }
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Running server on port: ${process.env.PORT}`);
});