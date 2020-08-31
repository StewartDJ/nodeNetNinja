const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');
//const { render } = require("ejs");

const app = express();

const dbURI = "mongodb+srv://netninja:test1234@cluster0.khrdn.mongodb.net/nodetuts?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(4000))
.catch((err) => console.log(err));

app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.get("/", (req, res) => {
  res.redirect("/blogs")
});


app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});




// app.delete('/blogs/:id', (req, res) => {
//   const id = req.params.id;
//   Blog.findByIdAndDelete(id)
//   .then(result => {
//     // we are going to send json with a redicrt property
//     res.json({redirect: '/blogs'})
//   })
//   .catch(err => {console.log(err)})
// })

//app.use(blogRoutes);
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});