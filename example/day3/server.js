const express = require('express');
const app = express();
const path = require('path');
const boardRouter = require('./routes/board')
const indexRouter = require('./routes')
const bookRouter = require('./routes/book');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/board', boardRouter);
app.use('/book', bookRouter);

app.listen(4000, () => {
    console.log('server on...');
})