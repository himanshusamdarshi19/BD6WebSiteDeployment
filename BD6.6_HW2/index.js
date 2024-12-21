const express = require("express");
const cors = require("cors");
const app = express();
const { getAllGames, getGameById } = require("./controllers");

app.use(express.json());
app.use(cors());

app.get("/BD6.6_HW2/games", (req, res) => {
  try {
    let games = getAllGames();
    console.log(games);
    res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/BD6.6_HW2/games/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let game = getGameById(id);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  res.json({ game });
});

module.exports = { app };
