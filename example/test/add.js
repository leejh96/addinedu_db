const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('add');
});

app.get('/add', (req, res) => {
    const { x, y } = req.query;
    res.send(`${parseInt(x) + parseInt(y)}`);
});

app.listen(4000, () => {
    console.log('server on...');
})