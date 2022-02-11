var express = require('express');
var session = require('express-session');
var parseurl = require('parseurl');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Control = require('./app/controller/control.js');
const fileUpload = require('express-fileupload');



var login = require('./app/controller/login');
var index = require('./app/controller/index');
var api = require('./app/controller/api');
var administracao = require('./app/controller/administracao');
var contato = require('./app/controller/contato');


var app = express();
var control = new Control;


app.use(require('express-is-ajax-request'));
// INICIANDO SESSION
app.set('trust proxy', 1); // trust first proxy

app.use(session({
  secret: 'testhit',
  resave: true,
  saveUninitialized: true
}));

 app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));



app.use(function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /assets
//app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());




app.use("/public", express.static(__dirname + '/public'));

app.use('/', index);
app.use('/sistema', login);
app.use('/sistema/api', api);
app.use('/sistema/administracao', administracao);
app.use('/contato', contato);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('ERROR --------------------- ERROR');
  console.log(err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (typeof req.session.id_usuario != 'undefined' && req.session.id_usuario != 0) {
    res.render('error', { erro: 'Página não existente.', tipo_erro: '404' });
  } else {
    var data = {};
    res.render('login/login', {data:data, erro: 'Página não existente, faça o login para acessar o sistema.', tipo_erro: '404' });
  }
});


module.exports = app;
