const express = require("express");
const cors = require("cors");
const { getAllBooks, getBookByID } = require("./controllers");

let app = express();
app.use(express.json());

app.get("/BD6.6_HW3/books", async (req, res) => {
  let books = await getAllBooks();
  res.json({ books });
});

app.get("/BD6.6_HW3/books/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let book = await getBookByID(id);
  res.json({ book });
});

module.exports = { app };
