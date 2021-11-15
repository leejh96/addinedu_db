const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
/*
웹페이지간의 정보를 공유하지 않아서, hidden 태그를 이용해서
다른페이지로 정보를 전송하는데 각자의 정보를 로그온 한 동안 유지해야함.
따라서 정보를 저장하는 객체로 쿠키와 세션이 있음

쿠키 - 로컬컴퓨터에 정보를 저장. 온라인 강의들을 때 진도정보같은 것들을 저장
      아이디 패스워드는 저장x, 일반 텍스트 파일이기 때문에 해킹 문제가 생길 수 있음

세션 - 서버에 정보를 저장
       req 객체가 갖고 있으며 브라우저를 끌 때까지 정보를 유지
       로그온 정보, 장바구니 정보
*/