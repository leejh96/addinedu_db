const express = require('express');
const app = express();

const data = {
    name: '홍길동',
    age: 12,
}

app.use('/use', (req, res) => {
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.end('<h1>Hi Hello</h1>')
    res.send(data);//json을 문자열로 알아서 바꾸어 전송
})

app.get('/get', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Get Hello</h1>')
})

app.post('/post', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Post Hello</h1>')
})

app.listen(4000, () => {
    console.log('listening 4000 PORT !!')
})