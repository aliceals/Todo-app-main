const express = require("express");
const response = require("./todos-response.json");
const app = express();
var bodyParser = require("body-parser");

app.use("/jsFiles", express.static(__dirname + "/FrontEnd/main.js"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/FrontEnd/index.html");
});

app.get("/todos", (req, res) => {
  res.send(response);
});

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  console.log(req.body);
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
