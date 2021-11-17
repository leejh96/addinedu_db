const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost', user: 'root', password: '1234',
    database: 'mydb', port: 5306
});

router.get('/', (req, res) => {
    res.redirect('/board/list/1');
});

router.get('/write', (req, res) => {
    if (!req.session.userid) {
        res.redirect('/member/logon')
    }
    const userInfo = {
        userid: req.session.userid,
        username: req.session.username,
        email: req.session.email
    }
    res.render('board/board_write', { userInfo })
});

router.get("/list/:id", (req, res) => {
    const userInfo = {
        userid: req.session.userid,
        username: req.session.username,
        email: req.session.email
    }
    const id = parseInt(req.params.id);
    pool.getConnection((err, connection) => {
        const sql = `select *, DATE_FORMAT(regdate, "%Y-%m-%d") wdate from tb_board a inner join tb_member b on a.write_id = b.member_id where delyn='N' limit ${(id - 1) * 5}, 5`
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
            } else {
                res.render("board/board_list", {
                    results,
                    userInfo
                });
            }
        });
    });
});

router.post('/save', (req, res) => {
    const { title, contents, writeId } = req.body;
    pool.getConnection((err, connection) => {
        const sql = `insert into tb_board(write_id, title, contents, hit, regdate, delyn) values('${writeId}','${title}','${contents}', 0, now(), 'N')`
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
            } else {
                res.redirect('/board/list/1')
                connection.release();
            }
        });
    });
});

router.get('/view/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = {
        userid: req.session.userid,
        username: req.session.username,
        email: req.session.email
    }
    pool.getConnection((err, connection) => {
        const sql = `select *, DATE_FORMAT(wdate,'%Y-%m-%d') date from tb_board a inner join tb_member b on a.write_id = b.member_id where board_id=${id}`
        const sql2 = `update tb_board set hit = hit + 1 where board_id=${id}`
        connection.query(sql2, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(results);
                        res.render('board/board_view', { results, userInfo })
                        connection.release();
                    }
                });
            }
        });

    });
});

module.exports = router;