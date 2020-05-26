// General imports
import express = require("express");
import { v4 as uuidv4 } from "uuid";

// Environment variables config
require('dotenv').config()

// General constants
const app: express.Application = express();

// Game type interface
interface Game {
    id: string | null;
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

// API handlers 
// List all games in memory
app.get("/v1/games", (req: any, res: any) => {
    res.json(games);
});

// List a specific game in memory by ID
app.get("/v1/games/:id", (req: any, res: any) => {
    // Find the game.
    let game = findGameByID(req.params.id);

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
        firstMove: null,
        secondMove: null,
        result: null,
    }

    // Push the new game into the global state variable
    games.push(gameObject);

    // Return the ID of the game to the creator/user
    res.json({"ID": gameObject.id})
});

app.listen(process.env.PORT, () => {
    console.log(`Running server on port: ${process.env.PORT}`);
});