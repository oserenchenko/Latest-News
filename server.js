var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.get("/", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      res.render("index", {
        articles: dbArticle
      });
    })
    .catch(function (err) {
      res.json(err);
    })
})

app.get("/saved", function (req, res) {
  db.Article.find({
      saved: true
    })
    .then(function (dbArticle) {
      res.render("saved", {
        articles: dbArticle
      })
    })
    .catch(function (err) {
      res.json(err);
    })
})


//When users visit the website it automatically scrapes news articles
app.get("/scrape", function (req, res) {
  request("https://www.npr.org/sections/news/", function (error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    var result = {};

    // Now, we grab every div with a class of card-content
    $("article.item").each(function (i, element) {
      result.title = $(element).children(".item-info").children(".title").children("a").text();
      result.link = $(element).children(".item-info").children(".title").children("a").attr("href");
      result.type = $(element).children(".item-info").children(".slug-wrap").children(".slug").children("a").text();

      var dateSum = $(element).children(".item-info").children(".teaser").children("a").text();
      var dateSumSplit = dateSum.split("•");
      result.date = dateSumSplit[0].trim();
      result.summary = dateSumSplit[1].trim();

      result.image = $(element).children(".item-image").children(".imagewrap").children("a").children("img").attr("src");

      //Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          // console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    })
    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  })
})

//delete all articles button click
app.get("/delete", function (req, res) {
  db.Article.deleteMany({})
    .then(function (dbArticle) {
      res.render("index", {
        articles: dbArticle
      });
    })
    .catch(function (err) {
      res.json(err);
    })
})

//saving articles on button click
app.put("/save/:id", function (req, res) {
  var objectID = req.params.id;
  db.Article.findByIdAndUpdate(objectID, {
    $set: {
      saved: true
    }
  }, {
    new: true
  }, function (err, dbArticle) {
    if (err) return handleError(err);
    res.send(dbArticle);
  });
})




// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});