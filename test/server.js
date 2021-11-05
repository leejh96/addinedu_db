const express = require('express');
const app = express();
const path = require('path');
const boardRouter = require('./routes/board')
const calcRouter = require('./routes/calc')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/calc', calcRouter);
app.use('/board', boardRouter);


app.listen(4000, () => {
    console.log('server on...');
})