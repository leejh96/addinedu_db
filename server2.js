const http = require('http');//외부 모듈을  이 파일내로 불러들인다. 
const fs = require('fs');
const ejs = require('ejs');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
    fs.readFile('html/product.html', 'utf-8', (e, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        const result = ejs.render(data, {
            title: '제품소개',
            product: [
                { product_name: '갤럭시 s12', product_price: '1200000' },
                { product_name: 'lg oled tv', product_price: '4000000' },
                { product_name: 'lg_드럼 세탁기', product_price: '1200000' },
                { product_name: 'TV', product_price: '2000000' },
                { product_name: '아이폰', product_price: '700000' },
            ]

        })
        res.end(result)
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});