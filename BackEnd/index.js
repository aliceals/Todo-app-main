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
  console.log(uniqueId);
  req.body.id = uniqueId;

  console.log(req.body);
  todosDatabase.push(req.body);
  res.send(req.body);
  //assign todo a unique id

  //save to the database
  //return it with the unique id
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
