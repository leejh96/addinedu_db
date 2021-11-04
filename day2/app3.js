const express = require('express');
const app = express();

app.use((req, res) => {
    const output = [];
    for (let i = 1; i <= 10; i++) {
        output.push({ count: i, name: `name-${i}` })
    }
    res.send(output);//json을 문자열로 알아서 바꾸어 전송
})


app.listen(4000, () => {
    console.log('listening 4000 PORT !!')
})