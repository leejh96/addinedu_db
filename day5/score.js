const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//mysql과 연동할 pool  객체 생성
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydb',
    port: 5306
});


app.get('/score/list', (req, res) => {
    pool.getConnection(function (err, connection) {
        const sql = `
        SELECT name, kor+eng+mat total, (kor+eng+mat)/3 average,
            case when (kor+eng+mat)/3 >= 90 then 'A'
                when (kor+eng+mat)/3 >= 80 then 'B'
                when (kor+eng+mat)/3 >= 70 then 'C'
                when (kor+eng+mat)/3 >= 60 then 'D'
                ELSE 'F'
            END grade
        FROM tb_score;					
        `
        connection.query(sql, function (err, rows) {
            if (err) {
                console.log("err : " + err);
            }
            else {
                res.render('score', { scores: rows });
            }
        });

    });
})

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
