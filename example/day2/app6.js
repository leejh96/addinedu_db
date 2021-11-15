const express = require('express');
const app = express();


app.use((req, res, next) => {
    req.name = 'brown';
    res.name = 'john'
    next();
})
app.use((req, res, next) => {
    req.phone = '010-1111-1111'
    res.phone = '010-1234-1234'
    next();
})
app.use((req, res, next) => {
    console.log('세번째 미들웨어');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>${req.name}</h1>`)
    res.write(`<h1>${res.name}</h1>`)
    res.write(`<h1>${req.phone}</h1>`)
    res.end(`<h1>${res.phone}</h1>`)

})
app.listen(4000, () => {
    console.log('listening 4000 PORT !!')
})