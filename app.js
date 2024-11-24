const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// تعريف المسار / لتعامل مع POST
app.post("/user", (req, res, next) => {
  res.send("<h1>User: " + req.body.username + "</h1>");
});

// تعريف المسار / لتعامل مع GET
app.get("/", (req, res, next) => {
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username" ><button type="submit">Create User </button></form>'
  );
});

app.listen(5000);
