const express = require('express');
const app = express();

app.use('/test', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    res.send(`이름 : ${name} 나이 : ${age}`);
})

app.use('/test2', (req, res) => {
    const arr = req.query.arr;
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        res.write(`<p> ${arr[i]}</p>`)
    }
    // res.end();
})

app.get('/calc', (req, res) => {
    const x = parseInt(req.query.x);
    const y = parseInt(req.query.y);
    const op = req.query.oper

    if (op === '1') {
        res.send(`${x} + ${y} = ${x + y}`)
    } else if (op === '2') {
        res.send(`${x} - ${y} = ${x - y}`)
    } else if (op === '3') {
        res.send(`${x} * ${y} = ${x * y}`)
    } else {
        res.send(`${x} / ${y} = ${x / y}`)
    }
})

app.listen(4000, () => {
    console.log('listening 4000 PORT !!')
})