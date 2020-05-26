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
    firstMove: string;
    secondMove: string;
    result: string;
}

// Global games state variable
let games: Array<Game> = [{id: "1", firstMove: "null", secondMove: "null", result: "null"}];

// API handlers 
app.get("/v1/games", (req: any, res: any) => {
    res.json(games);
});

app.get("/v1/game/:id", (req: any, res: any) => {
    console.log("Params", req.params);
});

app.listen(process.env.PORT, () => {
    console.log(`Running server on port: ${process.env.PORT}`);
});