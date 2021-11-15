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

router.get("/write", (req, res) => {
    res.render("member/member_register");
});
router.get("/logon", (req, res) => {
    res.render("member/member_logon");
});
router.use("/idcheck", (req, res) => {
    const { userId } = req.query;
    pool.getConnection(function (err, connection) {
        const sql = `select count(*) as cnt from member where userid='${userId}'`;
        connection.query(sql, function (err, rows) {
            if (err) {
                console.log("err : " + err);
            }
            else {
                if (rows[0]['cnt'] === 0) {
                    res.send({ result: 'success' });
                } else {
                    res.send({ result: 'fail' });

                }
            }
            connection.release();
        });
    });
});

router.post("/save", (req, res) => {
    const { userId, password, email, username, phone } = req.body;
    const ip = req.ip;
    pool.getConnection(function (err, connection) {
        const sql = `insert into member(userid, password, username, email, phone, wdate, ip) values('${userId}', '${password}', '${username}', '${email}', '${phone}', now(), '${ip}' )`;
        connection.query(sql, function (err, rows) {
            if (err) {
                console.log("err : " + err);
            }
            else {
                res.redirect('/')
            }
            connection.release();
        });
    });
});

router.post('/logon', (req, res) => {
    const { userId, password } = req.body;
    pool.getConnection(function (err, connection) {
        const sql = `select * from member where userid = '${userId}'`;
        connection.query(sql, function (err, rows) {
            if (err) {
                console.log("err : " + err);
            }
            else {
                if (rows.length < 1) {
                    res.send({ logon: 'fail' });

                } else {
                    if (rows[0]['password'] === password) {
                        res.redirect('/')
                    } else {
                        res.send({ logon: 'fail' });
                    }
                }
            }
            connection.release();
        });
    });
});

module.exports = router;