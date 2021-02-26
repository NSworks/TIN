var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const detectiveRouter = require('./routes/detectiveRoute');
const caseRouter = require('./routes/caseRoute');
const assignmentRouter = require('./routes/assignmentRoute');

const detectiveApiRouter = require('./routes/api/DetectiveApiRoute');
const caseApiRouter = require('./routes/api/CaseApiRoute');
const assignmentApiRouter = require('./routes/api/AssignmentApiRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/detectives', detectiveRouter);
app.use('/cases', caseRouter);
app.use('/assignments', assignmentRouter);

app.use('/api/detectives', detectiveApiRouter);
app.use('/api/cases', caseApiRouter);
app.use('/api/assignments', assignmentApiRouter);

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
