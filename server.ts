// General imports
import express = require("express");
import { v4 as uuidv4 } from "uuid";

// Environment variables config
require('dotenv').config()

// General constants
const app: express.Application = express();

// Global games state variable
let games = [];

app.get("/v1/game", (req: any, res: any) => {
    res.send("Hello World!");
});

app.get("/v1/game/:id", (req: any, res: any) => {
    console.log("Params", req.params);
});

app.listen(process.env.PORT, () => {
    console.log(`Running server on port: ${process.env.PORT}`);
});