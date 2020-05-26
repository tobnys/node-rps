// General imports
import express = require("express");
import { v4 as uuidv4 } from "uuid";

// Environment variables config
require('dotenv').config()

// General constants
const app: express.Application = express();

// Game type interface
interface Game {
    id: string;
    firstMove?: string | null;
    secondMove?: string | null;
    result?: string | null;
}

// Global games state variable
let games: Array<Game> = [{id: "1", firstMove: "null", secondMove: "null", result: "null"}];

// API handlers 

// List all games in memory
app.get("/v1/games", (req: any, res: any) => {
    res.json(games);
});

// List a specific game in memory by ID
app.get("/v1/game/:id", (req: any, res: any) => {
    res.json(games);
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