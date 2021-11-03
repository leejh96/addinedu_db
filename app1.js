//express 프레임워크 사용

const express = require('express');
const app = express();

app.use((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.send(`<h1>Hi Hello</h1>`)
});

app.listen(4000, () => {
    console.log('Example app listening on port 4000')
})