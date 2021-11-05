const express = require('express');
const router = express.Router();

router.get('/:op/:x/:y', (req, res) => {
    const op = parseInt(req.params.op);
    const { x, y } = req.params;

    if (op === 1) {
        res.send(`${x} + ${y} = ${parseInt(x) + parseInt(y)}`);
    } else if (op === 2) {
        res.send(`${x} - ${y} = ${parseInt(x) - parseInt(y)}`);

    } else if (op === 3) {
        res.send(`${x} * ${y} = ${parseInt(x) * parseInt(y)}`);

    } else {
        res.send(`${x} / ${y} = ${parseInt(x) / parseInt(y)}`);
    }
});


module.exports = router;