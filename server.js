const http = require('http');//외부 모듈을  이 파일내로 불러들인다. 
const fs = require('fs');
const ejs = require('ejs');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
    fs.readFile('html/test_ejs.html', 'utf-8', (e, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        const result = ejs.render(data, {
            title: 'ejs 엔진으로 렌더링하기',
            name: '홍길동',
            email: 'hong@gildong.com',
            favorite: ['런닝맨', '오징어게임', '놀면뭐하니', '뭉쳐야찬다']
        })
        console.log(result)
        res.end(result)
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});