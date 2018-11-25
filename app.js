const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// Setup database
mongoose.connect('mongodb://localhost/my-first-node-js-app');

let db = mongoose.connection;

// Check db connect
db.once('open', function(){
  console.log('Connected to mongodb');
});

// Check for db errors
db.on('error', function(error){
  console.log(error);
});

// Init App
const app = express();

// Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Bring in models
let Article = require('./models/article')

// Load views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function (req, res) {
  Article.find({}, function(error, articles){
    if(error){
      console.log(error)
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  });
});

// Add Article
app.get('/articles/add', function (req, res) {
  res.render('add_article', {
    title: 'Add Article'
  })
});

// Add submit POST to articles
app.post('/articles/add', function (req, res) {
  let article = new Article();

  article.title = req.body.title;
  article.body = req.body.body;
  article.author = req.body.author;

  article.save(function(err){
    if(err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
