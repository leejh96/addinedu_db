const express = require('express');
const router = express.Router();

const bookList = [
    { id: 1, title: "쌍갑포차1", author: "배혜수", publisher: "카카오웹툰", price: 12000, publish_year: 2019 },
    { id: 2, title: "쌍갑포차2", author: "배혜수", publisher: "카카오웹툰", price: 12000, publish_year: 2020 },
    { id: 3, title: "쌍갑포차3", author: "배혜수", publisher: "카카오웹툰", price: 12000, publish_year: 2029 },
    { id: 4, title: "쌍갑포차4", author: "배혜수", publisher: "카카오웹툰", price: 12000, publish_year: 2021 },
    { id: 5, title: "쌍갑포차5", author: "배혜수", publisher: "카카오웹툰", price: 12000, publish_year: 2021 },
];


router.get('/', (req, res) => {
    res.send('<h1>책</h1>')
})

router.get('/view/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.render('book/book_view', {
        book: bookList[id]
    });
})

router.get('/list', (req, res) => {
    res.render('book/book_list', {
        bookList
    });
})

router.get('/write', (req, res) => {
    const book = { id: -1, title: '', writer: '', contents: '', wdate: '' };
    res.render('book/book_write', { book });
})

router.post('/save', (req, res) => {
    const length = bookList.length + 1;
    const { title, author, publisher, price, publish_year } = req.body;
    bookList.push({
        id: length,
        title,
        author,
        publisher,
        price,
        publish_year,
    })
    res.redirect('/book/list')
});

router.get('/modify/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.render('book/book_write', { book: bookList[id] })
});

router.post('/modify_save', (req, res) => {
    const { title, publisher, author, id, price, publish_year } = req.body;
    bookList[id - 1] = {
        title, publisher, author, id, price, publish_year
    }
    res.redirect('/book/list')
});

router.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    bookList.splice(id, 1);
    res.redirect('/book/list');
});
module.exports = router;