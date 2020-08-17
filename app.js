const express = require("express");
const { rest } = require("lodash");
const app = express();

app.set("view engine", "ejs");
app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "yoshi finds eggs",
      snippet:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    },
    {
      title: "mario finds stars",
      snippet:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    },
    {
      title: "how to defeat bowser",
      snippet:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create new blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
