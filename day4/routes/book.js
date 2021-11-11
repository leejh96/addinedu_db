///복습문제 : 제품등록

const express = require('express');
const router = express.Router();

const mysql = require('mysql');

//mysql과 연동할 pool  객체 생성
const pool = mysql.createPool({
  connectionLimit: 10,  //디비 연결시간 10초동안 연결이 안되면 연결종료
  host: 'localhost',    //서버아이피 
  user: 'user01',       //아이디
  password: '1234',     //패스워드
  database: 'mydb',    //디비명  
  port: 5306            //포트번호
});


//book/list
//book/view/1
//book/write
//book/save
//book/modify/1
//book/modify_save
//book/delete/1

router.get("/", (request, response) => {
  response.redirect("/book/list/1");
});

router.get("/list", (request, response) => {
  response.redirect("/book/list/1");
});

//http://127.0.0.1:4000/book/list -> board_list.ejs 
router.get("/list/:page", (request, response) => {
  const page = request.params.page;
  pool.getConnection(function (err, connection) {
    const sql = `select id, title, author, publisher, 
         publish_year, price, date_format(wdate, '%Y-%m-%d') wdate 
         from book
         limit ${(page - 1) * 10}, 10`; //10개만 가져온다 

    connection.query(sql, function (err, rows) {
      //rows는 배열
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.render('book/book_list.ejs', { bookList: rows });
      }
    });

  });
});

//http://127.0.0.1:4000/book/view/1 -> board_view.ejs 
router.get("/view/:id", (request, response) => {
  const id = parseInt(request.params.id);
  pool.getConnection(function (err, connection) {

    const sql = `select id, title, author, publisher, 
           publish_year, price, date_format(wdate, '%Y-%m-%d') wdate 
           from book
           where id='${id}'
           `;
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.render('book/book_view.ejs', { book: rows[0] });
      }
      connection.release();
    });

  });
});

//http://127.0.0.1:4000/book/write -> board_write.ejs 
router.get("/write", (request, response) => {
  const book = { "id": -1, "title": "", "author": "", "publisher": "", "publish_year": "", "price": "" };
  response.render("book/book_write", { book: book });
});

//http://127.0.0.1:4000/book/save  
router.post("/save", (request, response) => {
  const title = request.body.title;
  const author = request.body.author;
  const publish_year = request.body.publish_year;
  const publisher = request.body.publisher;
  const price = request.body.price;

  pool.getConnection(function (err, connection) {

    const sql = `insert into book (title, author, publish_year, publisher, price, wdate)
        values('${title}', '${author}', '${publish_year}', '${publisher}','${price}',now()) `;
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.redirect("/book/list");
      }
      connection.release();
    });

  });
});

//http://127.0.0.1:4000/book/modify_save  
router.post("/modify_save", (request, response) => {
  const title = request.body.title;
  const author = request.body.author;
  const publish_year = request.body.publish_year;
  const publisher = request.body.publisher;
  const price = request.body.price;
  const id = request.body.id;
  pool.getConnection(function (err, connection) {


    const sql = `update book 
            set title='${title}'    
            , author='${author}'
            , publish_year='${publish_year}'
            , publisher= '${publisher}'
            , price='${price}'
             where id=${id} `;
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.redirect("/book/list"); //글 작성 후 목록으로 이동한다 
      }
      connection.release();
    });

  });
});

router.get("/modify/:id", (request, response) => {
  const id = parseInt(request.params.id);
  pool.getConnection(function (err, connection) {

    const sql = `select id, title, author, publisher, 
           publish_year, price, date_format(wdate, '%Y-%m-%d') wdate 
           from book
           where id='${id}'
           `;

    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.render('book/book_write.ejs', { book: rows[0] });
      }
      connection.release();
    });

  });
});

router.get("/delete/:id", (request, response) => {
  const id = request.params.id;
  pool.getConnection(function (err, connection) {

    const sql = `delete from book where id=${id}`;
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.redirect("/book/list"); //글 작성 후 목록으로 이동한다 
      }
      connection.release();
    });
  });
});

module.exports = router;