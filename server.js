//use express js for handle node framework
var express = require('express');
var app = express();
//use morgan for handle log activiy server via console
var morgan = require('morgan');
//use body-parser for handle middleware
//middleware will populate req.body
var bodyparser = require('body-parser');
//make sure use morgan before declare route path
if (app.get('env') == 'development') {
  app.use(morgan('dev'));
}

//The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false)
//or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded
//format, allowing for a JSON-like experience with URL-encoded
app.use(bodyparser.urlencoded({
  'extended' : 'false'
}));
app.use(bodyparser.json());
app.use(bodyparser.json({
  type : 'application/*+json'
}));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  res.setHeader('charset', 'utf-8');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
}); 


// app.all('/*', function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  // res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  // res.header('Access-Control-Expose-Headers', 'Content-Length');
  // res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  // if (req.method === 'OPTIONS') {
  // return res.send(200);
  // } else {
  // return next();
  // }
// });

// every path outside root will be ignore and will detected by express
// root path will target to 'app/views'
app.use('/', express.static(__dirname + '/app/views'));
// this path need declared for access 'app/views/partials'
app.use('/app/views/partials', express.static(__dirname + '/app/views/partials'));
// this path for tmp view
app.use('/app/views/partials/tpl', express.static(__dirname + '/app/views/partials/tpl'));
// setup route for assets
app.use('/src', express.static(__dirname + '/src'));
// this path need declared for access file 'src/js'
app.use('/src/js', express.static(__dirname + '/src/js'));
// this path need declared for access 'app/controllers'
app.use('/controllers', express.static(__dirname + '/app/controllers'));
// this path need declared for access 'app/directives'
app.use('/directives', express.static(__dirname + '/app/directives'));
// this path need declared for access file 'src/js'
app.use('/errors', express.static(__dirname + '/src/views/errors'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.redirect('/errors/not-found.html');
});
app.use(function(err, req, res, next) {
  res.status(500);
  res.redirect('/errors/server-error.html');
});

app.listen(3000);
console.log("=================== \n" + "server node running \n" + "access in your browser : http://localhost:3000 \n" + "stop server with : 'ctrl+c' \n" + "=================== \n");
