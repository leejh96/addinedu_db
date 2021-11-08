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


router.get("/", (request, response) => {
  response.redirect("/board/list/1");
});

router.get("/list", (request, response) => {
  response.redirect("/board/list/1");
});

router.get("/list/:page", (request, response) => {
  const page = request.params.page; ////////////////////////////
  pool.getConnection(function (err, connection) {

    const sql = `select id, title, writer, date_format(wdate, '%Y-%m-%d') wdate 
       from board limit ${(page - 1) * 10}, 10 `; //10개만 가져온다 
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.render('board/board_list.ejs', { boardList: rows });
      }
      connection.release();
    });

  });

});

//http://127.0.0.1:4000/board/view/1 -> board_view.ejs 
router.get("/view/:id", (request, response) => {
  const id = parseInt(request.params.id);
  pool.getConnection(function (err, connection) {

    const sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate 
        from board where id=${id}`;
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        const board = rows[0];
        board.contents = board.contents.replace(/\n/g, "<br>");  //\n -> <br>태그로 수정함 
        response.render('board/board_view.ejs', { board: board });
      }
      connection.release();
    });

  });
});



//http://127.0.0.1:4000/board/write -> board_write.ejs 
router.get("/write", (request, response) => {
  //비어있는 데이터 하나 던져서 동일하게 적용하랴고 
  const board = { "id": -1, "title": "", "writer": "", "contents": "", "wdate": "" };
  response.render("board/board_write", { board: board });
});

//http://127.0.0.1:4000/board/save  
router.post("/save", (request, response) => {
  const title = request.body.title;
  const contents = request.body.contents;
  const writer = request.body.writer;

  pool.getConnection(function (err, connection) {

    const sql = `insert into board (title, contents, writer, wdate)
        values('${title}', '${contents}', '${writer}', now()) `;
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
        console.log(rows);
      }
      else {
        response.redirect("/board/list"); //글 작성 후 목록으로 이동한다 
      }
      connection.release();
    });

  });

});

//http://127.0.0.1:4000/board/modify_save  
router.post("/modify_save", (request, response) => {


  const title = request.body.title;
  const contents = request.body.contents;
  const writer = request.body.writer;
  const id = request.body.id;

  pool.getConnection(function (err, connection) {

    const sql = `update board set  
            title='${title}'
            , writer='${writer}'
            , contents='${contents}'
            , wdate = now()
            where id=${id}`;

    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
        console.log(rows);
      }
      else {
        response.redirect("/board/list"); //글 작성 후 목록으로 이동한다 
      }
      connection.release();
    });
  });
});


//http://127.0.0.1:4000/board/modify/1  - 수정하고자 하는 글의 id가 필요하다 
router.get("/modify/:id", (request, response) => {
  const id = parseInt(request.params.id);
  pool.getConnection(function (err, connection) {

    const sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate 
         from board where id=${id}`;
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.render('board/board_write.ejs', { board: rows[0] });
      }
      connection.release();
    });

  });
});


router.use("/delete/:id", (request, response) => {
  const id = request.params.id;
  pool.getConnection(function (err, connection) {
    const sql = `delete from board where id=${id}`;
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log("err : " + err);
      }
      else {
        response.redirect("/board/list"); //글 작성 후 목록으로 이동한다 
      }
      connection.release();
    });
  });
});


//마지막에 모듈을 외부(다른파일)에서 쓸 수 있도록 해야 한다 
module.exports = router;

/*
textarea 태그는 엔터키를 \n 기호로
그리고 웹페이지에서는 <br>태그가 있어야 줄바꿈으로 보인다.
그래서 출력하기전에 \n -> <br>

정규식
/패턴/g  앞의 패턴에 일치하는 모든 문자열을
\n -> <br>로 바꾸어라
board.contents = board.contents.replace(/\n/g, "<br>"); -- 정규식을 이용한 수정
태그를 그대로 출력하려면 <%=  를 써야 한다  태그를 가공해서 <br> -> &lt;br&lt;

<%-board.contents%>  가공없이 원래 태그 그대로 출력하기
*/