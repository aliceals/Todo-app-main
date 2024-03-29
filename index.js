const express = require("express");
var todosDatabase = require("./todos-response.json");
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
  //get todo title
  var todoTitle = req.body.title;
  //check the rule
  if (todoTitle.length <= 3) {
    //send error
    res.status(400).send("Please enter a todo with more than 3 characters");
    return;
  }

  var uniqueId = todosDatabase.length + 1;
  req.body.id = uniqueId;
  todosDatabase.push(req.body);
  res.send(req.body);
});

app.put("/todos/:id", (req, res) => {
  todosDatabase[req.body.id] = req.body;

  res.send(req.body);
});

app.delete("/todos/", (req, res) => {
  todosDatabase = [];
  res.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
