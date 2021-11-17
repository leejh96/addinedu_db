const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: 'localhost',
    user: "root",
    password: '1234',
    database: 'mydb',
    port: 5306
});

async function getView(id) {
    const connection = await pool.getConnection(async conn => conn);
    try {
        await connection.beginTransaction();//여러개의 테이블이 동시에 작업할 때 트랜잭션 처리
        const sql1 = `update tb_board set hit = hit + 1 where board_id=${id}`;
        const sql2 = `select *, DATE_FORMAT(wdate,'%Y-%m-%d') date from tb_board a inner join tb_member b on a.write_id = b.member_id where board_id=${id}`;

        await connection.query(sql1);
        const results = await connection.query(sql2);
        console.log(results[0]);
        await connection.commit(); //확정
    } catch (error) {
        await connection.rollback(); //복구
    } finally {
        connection.release();
    }
}

getView(1);