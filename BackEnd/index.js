const express = require("express");
const todosDatabase = require("./todos-response.json");
const app = express();
var bodyParser = require("body-parser");

app.use("/jsFiles", express.static(__dirname + "/FrontEnd/main.js"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/FrontEnd/index.html");
});

app.get("/todos", (req, res) => {
  res.send(todosDatabase);
});

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var uniqueId = todosDatabase.length + 1;
  req.body.id = uniqueId;
  todosDatabase.push(req.body);
  res.send(req.body);
});

app.put("/todos/:id", (req, res) => {
  todosDatabase[req.body.id] = req.body;

  res.send(req.body);
});

app.delete("/todos/:id", (req, res) => {});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
