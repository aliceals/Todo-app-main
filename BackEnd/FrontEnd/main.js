var answer = 7;

//getting old todos from api
var todoContainer = document.getElementById("todo-info");
var btn = document.getElementById("btn");

var ourRequest = new XMLHttpRequest();
ourRequest.open("GET", "/todos");
ourRequest.onload = function() {
  var ourData = JSON.parse(ourRequest.responseText);
  renderHTML(ourData);
};
ourRequest.send();

function addToDoToDOM(id, title, userId, completed) {
  var buttonNode = document.createElement("button");
  buttonNode.setAttribute("data-todo-id", id);
  buttonNode.setAttribute("data-todo-title", title);
  buttonNode.setAttribute("data-todo-userId", userId);
  if (completed == true) {
    buttonNode.textContent = "✅";
  } else {
    buttonNode.textContent = "❎";
  }

  var liNode = document.createElement("li");
  var pNode = document.createElement("p");
  pNode.textContent = title;
  liNode.appendChild(pNode);
  liNode.appendChild(buttonNode);

  var ulDOMNode = document.querySelector("ul");
  ulDOMNode.appendChild(liNode);

  buttonNode.addEventListener("click", changeButton);
}

function renderHTML(data) {
  for (i = 0; i < data.length; i++) {
    if (data[i].userId == answer) {
      addToDoToDOM(
        data[i].id,
        data[i].title,
        data[i].userId,
        data[i].completed
      );
    }
  }
}

function changeButton(e) {
  updateTickBox(
    e.target.dataset.todoId,
    e.target.dataset.todoTitle,
    e.target.dataset.todoUserid,
    e.target
  );
  e.target.textContent = "❗";
  e.target.disabled = true;
}

function updateTickBox(id, title, userId, button) {
  // Update a user

  var url = "https://jsonplaceholder.typicode.com/todos";
  var completed;

  if (button.textContent == "✅") {
    completed = false;
  } else if (button.textContent == "❎") {
    completed = true;
  }

  var data = {
    userId: userId,
    id: id,
    title: title,
    completed: completed
  };

  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url + "/" + id, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

  xhr.onload = function() {
    var res = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.table(res);
      if (data.completed == true) {
        button.textContent = "✅";
      } else {
        button.textContent = "❎";
      }
      button.disabled = false;
    } else {
      console.error(res);
    }
  };

  xhr.send(json);
}

//making new todo from input field

var form = document.querySelector("form");
var todoList = document.querySelector("ul");
var input = document.getElementById("user-todo");

//id, title, userId, completed

form.addEventListener("submit", function(e) {
  e.preventDefault();
  //addToDoToDOM(99, input.value, 1, false);
  addToDoAPI(input.value, answer);
  input.value = "";
});

function addToDoAPI(title, userId) {
  var data = {
    userId: userId,
    title: title,
    completed: false
  };

  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/todos", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = function() {
    let fake_responseText =
      '{"userId":1,"title":"phil give alice massage","completed":false,"id":11}';

    var responseObject = JSON.parse(fake_responseText);
    addToDoToDOM(
      responseObject.id,
      responseObject.title,
      responseObject.userId,
      responseObject.completed
    );
  };
  xhr.send(json);
}
