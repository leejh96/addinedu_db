//express 라는 프레임워크를 이용해서 
const express = require('express');
const path = require('path');
const app = express();//express 객체를 생성하고 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const boardRouter = require('./routes/board'); //routes  폴더를 만들고 거기에 board.js 파일을 둔다 
const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const memberRouter = require('./routes/member');

app.use("/", indexRouter);
app.use("/board", boardRouter);
app.use("/book", bookRouter);
app.use("/member", memberRouter);

app.use(function (req, res) {
	res.render('index');
});

app.listen(4000, function () {
	console.log('Example app listening on port 4000!');
});
