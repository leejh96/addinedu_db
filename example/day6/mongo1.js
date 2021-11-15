const mongoose = require('mongoose');
const promise = mongoose.connect('mongodb://localhost/mydb');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('connected successfully');
    db.collection('member').find({}).toArray(function (err, results) {
        console.log({ rows: results });
    });
})