const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {
    userid, host, password, database, port
} = require('./common');
const pool = mysql.createPool({
    connectionLimit: 10,
    host,
    user: userid,
    password,
    database,
    port
})

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.getConnection((err, connection) => {
        if (err) {
            next(err);
        }
        const sql = `select * from board where id= ${id}`;
        connection.query(sql, (err, result) => {
            console.log(result);
            res.send(JSON.stringify([result[0]]));
            connection.release();
        })
    })
})

router.get('/list/:page', (req, res, next) => {
    const page = parseInt(req.params.page);
    pool.getConnection((err, connection) => {
        if (err) {
            next(err);
        }
        const sql = `select * from board limit ${(page - 1) * 5}, 5`;
        connection.query(sql, (err, result) => {
            res.send(JSON.stringify(result));
            connection.release();
        })
    })
})


router.get('/edit/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.getConnection((err, connection) => {
        if (err) {
            next(err);
        }
        const sql = `select * from board where id = ${id}`;
        connection.query(sql, (err, result) => {
            res.send(JSON.stringify(result[0]));
            connection.release();
        })
    })
})

router.post('/insert', (req, res, next) => {
    const { title, writer, contents } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            next(err);
        }
        const sql = `insert into board(id, title, writer, contents) values(${Math.floor(Math.random() * 100000)},'${title}', '${writer}', '${contents}')`;
        connection.query(sql, (err, result) => {
            res.send(JSON.stringify(result));
            connection.release();
        })
    })
});


router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const { title, writer, contents } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            next(err);
        }
        const sql = `update board set
                    title='${title}',
                    writer='${writer}',
                    contents='${contents}'
                    where id = ${id}`;
        connection.query(sql, (err, result) => {
            res.send('ok');
            connection.release();
        })
    })
})

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.getConnection((err, connection) => {
        if (err) {
            next(err);
        }
        const sql = `delete from board where id =${id}`;
        connection.query(sql, (err, result) => {
            res.send('ok');
            connection.release();
        })
    })
})
module.exports = router;
