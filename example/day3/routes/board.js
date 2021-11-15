const express = require('express');
const router = express.Router();

const boardList = [
    { id: 1, title: '제목1', writer: '작성자1', contents: '내용1', wdate: '2021-11-03' },
    { id: 2, title: '제목2', writer: '작성자2', contents: '내용2', wdate: '2021-11-04' },
    { id: 3, title: '제목3', writer: '작성자3', contents: '내용3', wdate: '2021-11-05' },
    { id: 4, title: '제목4', writer: '작성자4', contents: '내용4', wdate: '2021-11-06' },
    { id: 5, title: '제목5', writer: '작성자5', contents: '내용5', wdate: '2021-11-07' }
]

router.get('/', (req, res) => {
    res.send('<h1>게시판</h1>')
})

router.get('/view/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.render('board/board_view', {
        board: boardList[id]
    });
})

router.get('/list', (req, res) => {
    res.render('board/board_list', {
        boardList
    });
})

router.get('/write', (req, res) => {
    const board = { id: -1, title: '', writer: '', contents: '', wdate: '' };
    res.render('board/board_write', { board });
})

router.post('/save', (req, res) => {
    const length = boardList.length + 1;
    const { title, writer, contents } = req.body;
    const today = new Date();
    boardList.push({
        id: length,
        title,
        writer,
        contents,
        wdate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    })
    res.redirect('/board/list')
});

router.get('/modify/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.render('board/board_write', { board: boardList[id] })
});

router.post('/modify_save', (req, res) => {
    const { title, writer, contents, id } = req.body;
    const today = new Date();
    boardList[id - 1] = {
        title, contents, writer, id, wdate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    }
    res.redirect('/board/list')
});
module.exports = router;