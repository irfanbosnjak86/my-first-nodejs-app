const express = require('express');
const path = require('path')

const app = express();

// Load views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function (req, res) {
  res.render('index', {
    variable: 'I am some variable'
  })
});

// Add Article
app.get('/add', function (req, res) {
  res.render('add_article', {
    title: 'Add Article'
  })
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
