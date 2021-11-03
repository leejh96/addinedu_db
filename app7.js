const express = require('express');
const app = express();

app.get('/add/:x/:y', (req, res) => {
    const { x, y } = req.params;
    res.send(`${x} + ${y} = ${parseInt(x) + parseInt(y)}`);
});

app.get('/gugudan/:dan', (req, res) => {
    const { dan } = req.params;
    let output = '';
    for (let i = 1; i < 10; i++) {
        output += `${dan} * ${i} = ${dan * i} <br>`
    }
    res.send(output);
});
app.listen(4000, () => {
    console.log('listening 4000 PORT !!')
})