//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent =
  "This is a journal blog page. You can make it about anything you want! Ive added some Lorem Ipsum just to fill up the space. Enjoy! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent =
  "This is a journal blog page. You can make it about anything you want! Ive added some Lorem Ipsum just to fill up the space. Enjoy! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  //   if (req.body.publishContent) {
  posts.push(post);
  res.redirect("/home");
  //   }
});

// app.post("/post/:post", function (req, res) {
//   console.log(req.params);
// });

app.get("/", function (req, res) {
  res.render("home", {
    posts: posts,
  });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.get("/home", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});
app.get("/posts/:post", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.post);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (requestedTitle === storedTitle) {
      //   console.log("Match Found!");
      res.render("post", { title: post.title, content: post.content });

      // } else {
      //   console.log("no match found!");
      // }
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
