const express = require('express');
const app = express();


app.use((req, res) => {
    const agent = req.header('User-Agent');//브라우저 정보 가졍괴
    console.log(agent);
    console.log(req.headers);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hi Hello</h1>')
})

app.listen(4000, () => {
    console.log('listening 4000 PORT !!')
})