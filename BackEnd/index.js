const express = require("express");
const response = require("./todos-response.json");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/todos", (req, res) => {
  res.send(response);
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
