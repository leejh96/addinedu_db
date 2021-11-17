const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index');
const memberRouter = require('./routes/member');
const boardRouter = require('./routes/board');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'asdfqwerzxcv', //세션암호 키값
  resave: false, // session 데이터가 바뀌기 전까지는 재저장 X. false로 둘 것
  saveUninitialized: true, //초기화되지 않은 채 스토어 저장
  store: new FileStore() // 저장매체, 형식
}))

app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/board', boardRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;