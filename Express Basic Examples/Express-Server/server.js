const { request, response } = require("express");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello, world!</h1>");
});

app.get("/contact", (req, res) => {
  res.send("Contact me at ismaildemircann98@gmail.com");
});

app.get("/about", (req, res) => {
  res.send(
    "I am Ismail, I am study at Eskisehir Osmangazi University. I am learning web development."
  );
});

app.get("/hobbies", (req, res) => {
  res.send("<ul><li>Coffee</li><li>Code</li><li>Beer</li></ul>");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
