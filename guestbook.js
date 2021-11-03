const express = require('express');
const app = express();
const path = require('path');


// 템플릿이 들어있는 폴더 설정 첫번째 매개변수는 고정(views)
app.set('views', path.join(__dirname, 'views'));
// 뷰 엔진 설정
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

const guestbookList = [
    { id: 1, title: '제목1', writer: '작성자1', contents: '내용1', wdate: '2021-11-03' },
    { id: 2, title: '제목2', writer: '작성자2', contents: '내용2', wdate: '2021-11-04' },
    { id: 3, title: '제목3', writer: '작성자3', contents: '내용3', wdate: '2021-11-05' },
    { id: 4, title: '제목4', writer: '작성자4', contents: '내용4', wdate: '2021-11-06' },
    { id: 5, title: '제목5', writer: '작성자5', contents: '내용5', wdate: '2021-11-07' }
]

app.get('/list', (req, res) => {
    res.render('guestbook/list', {
        title: '게시판목록',
        guestbookList
    })
});

//상세화면 보기
app.get('/view/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.render('guestbook/view', {
        title: '게시판 상세화면',
        guestbook: guestbookList[id]
    })
});

app.get('/write', (req, res) => {
    res.render('guestbook/write')
});

app.post('/write', (req, res) => {
    const { title, writer, contents, wdate } = req.body;
    const id = guestbookList.length + 1
    guestbookList.push({ id, title, writer, contents, wdate })
    res.redirect('/list')
});

app.listen(4000, () => {
    console.log('Example app listening on port 4000')
})