const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
/* Creating an express app */
const app = express();
const port = process.env.PORT || 4000;
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toDateString();
  var url = `${req.method} by ${req.url}`;
  var log = now + ' : ' + url + '\n';
  fs.appendFileSync('server.log', log , (err) => {
    if (err) {
      console.log('Unable to Log to Serverlog file');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintanence.hbs')
});

app.use(express.static(__dirname + '/public'));


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getyear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('capitalize', (param1) => {
  console.log(param1);
  return param1.toUpperCase();
});



/* get is used to register handler for http get requests. To return something on hitting a url */
app.get('/', (request, response) => {
  // request -> Incoming request info like headers.response -> has many methods available to decide how we respond with */
  response.send('Landing Page');
});
app.get('/home', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageDesc: 'Home Page Description',
    welcomeMessage: 'Welcome to home'
  });
});
app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    pageDesc: 'About Page Description'
  });
});

/* To make our app listen to port 4000 */
app.listen(port, () => {
  console.log(`Server is up on port:${port}`);
});