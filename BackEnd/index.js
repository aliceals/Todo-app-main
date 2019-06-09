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
  console.log(req.body);
  todosDatabase.push(req.body);
  res.send(req.body);
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
