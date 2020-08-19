const express = require("express");
const { rest } = require("lodash");

const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const { render } = require("ejs");

const app = express();

const dbURI = "mongodb+srv://netninja:test1234@cluster0.khrdn.mongodb.net/nodetuts?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
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

// app.get("/add-blog", (req, res) => {
// const blog = new Blog({
//   title: "new blog 2", 
//   snippet: "about my new blog",
//   body: "more about my new blog"
// });

// blog.save()
// .then((result) => { 
//   res.send(result)
// })
// .catch((err) => { 
//   console.log(err);
// });
// })

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//   .then((result) =>{
//     res.send(result);
//   })
//   .catch((err) => { 
//     console.log(err);
//   });
// })


// app.get("/single-blog", (req, res) => {
//   Blog.findById("5f3b65efef951118e8053f0b")
//   .then((result) =>{
//     res.send(result);
//   })
//   .catch((err) => { 
//     console.log(err);
//   });
// })




app.get("/", (req, res) => {
  res.redirect("/blogs")
});


app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});


app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});


app.get("/blogs", (req, res) =>{
  Blog.find().sort({createdAt: -1})
  .then((result) => {
    res.render("index", { blogs: result, title: "All blogs" });
  })
  .catch((err) => {
    console.log(err);
  });
})

app.post("/blogs", (req, res) => {
 console.log(req.body);
 const blog = new Blog(req.body);

 blog.save()
 .then(result => {
   res.redirect("/blogs");
 })
 .catch(err => {
   console.log(err);
 });
});


//cannot find the id when console.loggign for some reason something went wrong before 16 min video mark in video 10

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: "/blogs" });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});