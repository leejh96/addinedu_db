const http = require('http');//외부 모듈을  이 파일내로 불러들인다. 

const hostname = '127.0.0.1';
const port = 4000;
const url = require('url'); //get방식처리
const querystring = require('querystring');
// const URLSearchParams = require('url-search-params');

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        req.on('data', (receive) => {
            const data = querystring.parse(receive.toString());
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(JSON.stringify(data));
        })
    } else if (req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const query = url.parse(req.url, true).query;
        res.end(JSON.stringify(query));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});