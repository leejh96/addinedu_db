const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: 'localhost', user: 'root', password: '1234',
  database: 'mydb', port: 5306
});

//http://127.0.0.1:4000/member/register_form 
router.get("/register", (req, res) => {
  const userInfo = {
    userid: req.session.userid,
    username: req.session.username,
    email: req.session.email
  }
  res.render("member/member_register", userInfo); //views/member/member_register.ejs 를 불러와서 화면에 보이기 
});

router.get('/logon', (req, res) => {
  res.render('member/member_logon');
});

//http://127.0.0.1:4000/member/register
router.post("/register", (req, res) => {
  const {
    userid,
    username,
    password,
    email,
    phone,
    nickname,
    zipcode,
    address1,
    address2
  } = req.body

  const userInfo = {
    userid: req.session.userid,
    username: req.session.username,
    email: req.session.email
  }
  pool.getConnection((err, connection) => {
    const sql = `
        insert into tb_member(user_id, username, password, email, phone, nickname, 
            zipcode, address1, address2, wdate)
        values ( '${userid}', '${username}', '${password}', '${email}', '${phone}', '${nickname}', 
        '${zipcode}', '${address1}', '${address2}', now()) `;

    connection.query(sql, (err, results) => {
      if (err) {
        res.send({ success: false });
      } else {
        res.send({ success: true });
      }
    });
  });
});

router.post('/logon', (req, res) => {
  const { userid, password } = req.body;
  pool.getConnection((err, connection) => {
    const sql = `select * from tb_member where user_id='${userid}' and password='${password}'`;
    connection.query(sql, (err, results) => {
      if (err) {
        res.send({ success: false });
      } else {
        if (results.length === 0) {
          res.send({ success: false });
        } else {
          req.session.userid = results[0].user_id;
          req.session.username = results[0].username;
          req.session.email = results[0].email;
          res.send({ success: true });
        }
      }
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(); //세션제거
  res.redirect('/');
});

router.use("/idcheck", (req, res) => {
  const { userid } = req.query;
  pool.getConnection(function (err, connection) {
    const sql = `select count(*) as cnt from tb_member where user_id='${userid}'`;
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

module.exports = router;